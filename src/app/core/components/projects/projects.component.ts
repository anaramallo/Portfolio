import { Component } from '@angular/core';
import {JsonPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    JsonPipe
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  API = environment.API_BASE_URL;
  projectImageUrl: string = `${this.API}/images/proyectos.jpg`;

  projects = [
    {
      title: 'ANÁLISIS DE DATOS',
      description: 'Procesamiento de datos para predecir tendencias usando Machine Learning.',
      imageUrl: `${this.API}/images/p1_mlearning.jpg`,
      link: '#'
    },
    {
      title: 'PORTFOLIO INTERACTIVO',
      description: 'Creación de un portfolio responsivo con Angular para destacar mis habilidades.',
      imageUrl: `${this.API}/images/p3_portfolio.png`,
      link: '#'
    },
    {
      title: 'RESERVAS PARKING AUTOCARAVANAS',
      description: 'Desarrollo de una app móvil para gestionar reservas en un parking de autocaravanas.',
      imageUrl: `${this.API}/images/p2_parking.jpg`,
      link: '#'
    }
  ];

}
