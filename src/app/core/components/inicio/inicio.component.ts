import { Component, OnInit } from '@angular/core';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { NgStyle } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true,
  imports: [TypewriterComponent, NgStyle]
})
export class InicioComponent implements OnInit {
  // Base de tu API (localhost en dev, Render en prod)
  API = environment.API_BASE_URL;

  // Fondo del hero desde tu backend
  heroImageUrl = `${this.API}/images/header.jpg`;

  ngOnInit(): void {}
}
