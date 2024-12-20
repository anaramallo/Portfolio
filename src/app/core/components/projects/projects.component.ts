import { Component } from '@angular/core';
import {JsonPipe, NgForOf, NgOptimizedImage} from "@angular/common";

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

  projects = [
    {
      title: 'Análisis de Datos',
      description: 'Procesamiento de datos para predecir tendencias usando Machine Learning.',
      imageUrl: 'http://localhost:5000/images/p1_mlearning.jpg',
      link: '#'
    },
    {
      title: 'Portfolio Interactivo',
      description: 'Creación de un portfolio responsivo con Angular para destacar mis habilidades.',
      imageUrl: 'http://localhost:5000/images/p3_portfolio.png',
      link: '#'
    },
    {
      title: 'Aplicación reservas parking autocaravanas',
      description: 'Desarrollo de una app móvil para seguimiento de hábitos y objetivos.',
      imageUrl: 'http://localhost:5000/images/p2_parking.jpg',
      link: '#'
    }
  ];

}
