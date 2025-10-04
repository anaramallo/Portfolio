import { Component } from '@angular/core';
import {JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { environment } from '../../../../environments/environment';
import { ProjectStatus } from '../../../shared/types/project-status';
import { ProjectCtaComponent } from '../../../shared/ui/project-cta.component';
import { ProjectBadgeComponent } from '../../../shared/ui/project-badge.component';
import {Project, PROJECTS} from "../../../shared/data/projects.data";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    JsonPipe,
    ProjectCtaComponent,
    ProjectBadgeComponent,
    NgIf
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  API = environment.API_BASE_URL;
  projectImageUrl: string = `${this.API}/images/proyectos.jpg`;

  // Helper para montar URLs (evita // y funciona con rutas relativas)
  private img(path: string): string {
    return `${this.API}/${path.replace(/^\/+/, '')}`;
  }

  projects: Array<Project & {imageUrl: string }> =
    PROJECTS.map(p=> ({...p, imageUrl: this.img(p.imagePath)}));

}
