
/*
* Muestra una etiqueta en la esquina solo cuando el proyecto
* no está en live
* */

import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ProjectStatus } from '../types/project-status';

@Component({
  selector: 'app-project-badge',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="absolute top-3 left-3 z-10"
         *ngIf="status === ProjectStatus.InProgress || status === ProjectStatus.ComingSoon">
      <span class="px-2 py-1 text-xs font-semibold rounded-md
                   bg-amber-100 text-amber-800 ring-1 ring-amber-200">
        {{ status === ProjectStatus.InProgress ? 'En desarrollo' : 'Próximamente' }}
      </span>
    </div>
  `
})
export class ProjectBadgeComponent {
  @Input() status!: ProjectStatus;
  ProjectStatus = ProjectStatus;
}
