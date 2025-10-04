import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { ContactModalService } from "../../../shared/services/contact-modal.service";
import { Subscription } from 'rxjs';

import {
  ReactiveFormsModule,
  Validators,
  NonNullableFormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, OnDestroy{
  private http = inject(HttpClient);
  private fb = inject(NonNullableFormBuilder);
  private contactModal = inject(ContactModalService);
  private subscription?: Subscription;
  isModalOpen = false; // Nueva propiedad

  API = environment.API_BASE_URL;

  form: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    message: FormControl<string>;
    website: FormControl<string>; // honeypot
  }> = this.fb.group({
    // 👇 nada de { nonNullable: true }. Ya lo es por usar NonNullableFormBuilder.
    name: this.fb.control('', { validators: [Validators.required, Validators.minLength(2)] }),
    email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
    message: this.fb.control('', { validators: [Validators.required, Validators.minLength(10)] }),
    website: this.fb.control('') // debe quedar vacío
  });

  get f() { return this.form.controls; }

  loading = false;
  sent = false;
  error = '';

  submit() {
    this.error = '';
    // corta si es inválido o si el honeypot trae algo
    if (this.form.invalid || this.form.value.website) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.http.post(`${this.API}/api/contact`, this.form.getRawValue()).subscribe({
      next: () => { this.sent = true; this.form.reset(); },
      error: () => { this.error = 'Ha ocurrido un error. Inténtalo de nuevo.'; },
      complete: () => { this.loading = false; }
    });
  }

  ngOnInit() {
    this.subscription = this.contactModal.open$.subscribe(() => {
      this.isModalOpen = true;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
