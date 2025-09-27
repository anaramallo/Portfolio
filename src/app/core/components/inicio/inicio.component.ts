import {Component, TrackByFunction} from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { environment } from '../../../../environments/environment';
import { PROJECTS, Project } from '../../../shared/data/projects.data';
import { ProjectCtaComponent } from '../../../shared/ui/project-cta.component';

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
  private api = environment.API_BASE_URL.replace(/\/+$/, '');
  private img(path: string): string {        // 👈 método, más robusto en TS
    return `${this.api}/${path.replace(/^\/+/, '')}`;
  }

  heroImageUrl = this.img('images/header.jpg');

  // Tipado completo
  homeProjects: Array<Project & { imageUrl: string }> =
    (PROJECTS.some(p => p.featured) ? PROJECTS.filter(p => p.featured) : PROJECTS.slice(0, 2))
      .map(p => ({ ...p, imageUrl: this.img(p.imagePath) }));

  trackByTitle: TrackByFunction<Project & { imageUrl: string }> = (_, p) => p.title;}
