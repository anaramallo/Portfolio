import { Component, OnInit } from '@angular/core';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { NgStyle } from '@angular/common';
import { environment } from '../../../../environments/environment';
import {ProjectCtaComponent} from "../../../shared/ui/project-cta.component";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true,
  imports: [TypewriterComponent,
    NgStyle,
    ProjectCtaComponent
  ]
})
export class InicioComponent implements OnInit {
  // Base de tu API (localhost en dev, Render en prod)
  API = environment.API_BASE_URL;

  // Fondo del hero desde mi back
  heroImageUrl = `${this.API}/images/header.jpg`;

  ngOnInit(): void {}
}
