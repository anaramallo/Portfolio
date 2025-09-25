
/*
* Manejar todos los botones de acción, decide
* si mostrar enlace activo o botón deshabilitado
* */

import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ProjectStatus } from '../types/project-status';

@Component({
  selector: 'app-project-cta',
  standalone: true,
  imports: [NgIf],
  template: `
    <!-- ✅ LÓGICA CONDICIONAL RESTAURADA -->
    <ng-container *ngIf="status === ProjectStatus.Live && href; else disabledTpl">
      <a [href]="href"
         target="_blank"
         rel="noopener noreferrer"
         class="btn btn-md btn-sky project-cta"
         [attr.aria-label]="ariaLabel || label || 'Ver proyecto'">
        {{ label || 'Ver proyecto' }}
      </a>
    </ng-container>

    <ng-template #disabledTpl>
      <button type="button"
              disabled
              aria-disabled="true"
              class="btn btn-md btn-sky-muted project-cta"
              [attr.title]="ariaLabel || defaultLabel">
        {{ label || defaultLabel }}
      </button>
    </ng-template>
  `
})
export class ProjectCtaComponent {
  @Input() status: ProjectStatus = ProjectStatus.InProgress;
  @Input() href = '';
  @Input() label = '';
  @Input() ariaLabel = '';

  ProjectStatus = ProjectStatus;

  get defaultLabel() {
    switch (this.status) {
      case ProjectStatus.ComingSoon: return 'Próximamente';
      case ProjectStatus.Private:    return 'Código privado';
      case ProjectStatus.InProgress: return 'Proyecto en proceso';
      default:                       return 'Ver proyecto';
    }
  }
}
