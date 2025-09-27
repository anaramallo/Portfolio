import {Component, TrackByFunction} from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { environment } from '../../../../environments/environment';
import { PROJECTS, Project } from '../../../shared/data/projects.data';
import { ProjectCtaComponent } from '../../../shared/ui/project-cta.component';
import {ProjectStatus} from "../../../shared/types/project-status";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ContactModalService} from "../../../shared/services/contact-modal.service";

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  imports: [
    TypewriterComponent,
    NgStyle,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    ProjectCtaComponent
  ]
})
export class InicioComponent {

  constructor(private contactModal: ContactModalService) {
    // cuando alguien pida abrir el modal desde fuera (navbar), lo abrimos aquí
    this.contactModal.open$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.openContact());
  }

  ProjectStatus = ProjectStatus;
  private api = environment.API_BASE_URL.replace(/\/+$/, '');
  private img(path: string): string {
    return `${this.api}/${path.replace(/^\/+/, '')}`;
  }
  private asset = (p: string) => `${this.api}/${p.replace(/^\/+/, '')}`;
  private mailto(to: string, subject: string, body: string) {
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  heroImageUrl = this.img('images/header.jpg');
  cvViewUrl = this.asset('docs/anacv.pdf');
  cvDownloadUrl  = this.asset('cv/download');

  contactEmail = 'anaramallogonzalez@gmail.com';
  linkedinHref = 'https://www.linkedin.com/in/anamramallogonzalez/';

// texto del mensaje
  subject = 'Contacto desde tu portfolio';
  body = `Hola Ana,

He visto tu portfolio y me gustaría hablar contigo.`;

//Hrefs listos para el template
  get mailtoHref(): string {
    return `mailto:${this.contactEmail}`
      + `?subject=${encodeURIComponent(this.subject)}`
      + `&body=${encodeURIComponent(this.body)}`;
  }

  get gmailHref(): string {
    return 'https://mail.google.com/mail/?view=cm&fs=1'
      + `&to=${encodeURIComponent(this.contactEmail)}`
      + `&su=${encodeURIComponent(this.subject)}`
      + `&body=${encodeURIComponent(this.body)}`;
  }

  get outlookWebHref(): string {
    return 'https://outlook.office.com/mail/deeplink/compose'
      + `?to=${encodeURIComponent(this.contactEmail)}`
      + `&subject=${encodeURIComponent(this.subject)}`
      + `&body=${encodeURIComponent(this.body)}`;
  }

  // modal
  showContact = false;
  openContact(e?: Event) {
    e?.preventDefault();
    this.showContact = true;
    document.documentElement.classList.add('overflow-hidden'); // bloquea scroll fondo
  }

  closeContact() {
    this.showContact = false;
    document.documentElement.classList.remove('overflow-hidden');
  }

  async copyEmail() {
    try {
      await navigator.clipboard.writeText(this.contactEmail);
      this.copied = true;
      setTimeout(() => (this.copied = false), 1500);
    } catch {}
  }
  copied = false;

  //Tipado completo
  homeProjects: Array<Project & { imageUrl: string }> =
    (PROJECTS.some(p => p.featured) ? PROJECTS.filter(p => p.featured) : PROJECTS.slice(0, 2))
      .map(p => ({ ...p, imageUrl: this.img(p.imagePath) }));

  trackByTitle: TrackByFunction<Project & { imageUrl: string }> = (_, p) => p.title;
  protected readonly encodeURIComponent = encodeURIComponent;
}

