
/*
* Manejar todos los botones de acción, decide
* si mostrar enlace activo o botón deshabilitado
* */

import { Component, Input } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import { ProjectStatus } from '../types/project-status';
type Variant = 'sky' | 'blue';

@Component({
  selector: 'app-project-cta',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <!--LÓGICA CONDICIONAL-->
  <ng-container *ngIf="status === ProjectStatus.Live && href; else disabledTpl">
  <a [href]="href" target="_blank" rel="noopener"
  class="inline-block px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-medium rounded-lg
  transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
  [ngClass]="variant==='sky'
  ? 'bg-sky-100 text-sky-700 hover:bg-sky-200 hover:scale-105 focus-visible:outline-sky-600'
  : 'bg-blue-500 text-white hover:bg-blue-600 focus-visible:outline-blue-600'"
  [attr.aria-label]="ariaLabel || label || 'Ver proyecto'">
  {{ label || 'Ver proyecto' }}
</a>
</ng-container>

<ng-template #disabledTpl>
<button type="button" disabled aria-disabled="true"
class="inline-block px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-medium rounded-lg
transition-all duration-200 cursor-not-allowed select-none focus:outline-none"
  [ngClass]="variant==='sky'
  ? 'bg-sky-50 text-sky-500 border border-sky-200'
  : 'bg-gray-200 text-gray-600'"
  [attr.title]="defaultLabel">
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
  @Input() variant: Variant='blue';

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
