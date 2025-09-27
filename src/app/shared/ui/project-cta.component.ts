/*
 * Botón/CTA reutilizable
 * - Live + href → <a> activo
 * - Otros estados → <button disabled>
 */
import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { ProjectStatus } from '../types/project-status';

type Variant = 'blue' | 'sky' | 'outline';

@Component({
  selector: 'app-project-cta',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
  <!-- HABILITADO (solo si está Live y hay href) -->
    <ng-container *ngIf="status === ProjectStatus.Live && href; else disabledTpl">
    <a [href]="href" target="_blank" rel="noopener"
  class="inline-block px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-medium rounded-lg
  transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
  [ngClass]="variant === 'sky'
  ? 'bg-sky-100 text-sky-700 hover:bg-sky-200 hover:scale-105 focus-visible:outline-sky-600'
  : 'bg-blue-500 text-white hover:bg-blue-600 focus-visible:outline-blue-600'"
  [attr.aria-label]="ariaLabel || label || 'Ver proyecto'">
  {{ label || 'Ver proyecto' }}
</a>
</ng-container>

<!-- DESHABILITADO (gris SIEMPRE, ignoramos variant) -->
<ng-template #disabledTpl>
<button type="button" disabled aria-disabled="true"
class="inline-block px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-medium rounded-lg
bg-gray-200 text-gray-600 cursor-not-allowed select-none
ring-1 ring-gray-300/70">
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
  @Input() variant: Variant = 'blue';
  @Input() block = false;
  @Input() download = false;
  @Input() downloadFileName?: string;
  @Input() target?: '_self' | '_blank';

  ProjectStatus = ProjectStatus;

  get sizeClass() { return 'py-2 sm:py-2.5 text-sm sm:text-base font-medium'; }

  get variantClass() {
    switch (this.variant) {
      case 'sky':
        return 'bg-sky-100 text-sky-700 hover:bg-sky-200 hover:scale-105 focus-visible:outline-sky-600';
      case 'outline':
        return 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus-visible:outline-gray-400';
      default: // 'blue'
        return 'bg-blue-500 text-white hover:bg-blue-600 focus-visible:outline-blue-600';
    }
  }

  get disabledClass() {
    switch (this.variant) {
      case 'sky':     return 'bg-sky-50 text-sky-500 border border-sky-200';
      case 'outline': return 'bg-white text-gray-400 border-2 border-gray-200';
      default:        return 'bg-gray-200 text-gray-600';
    }
  }

  get defaultLabel() {
    switch (this.status) {
      case ProjectStatus.ComingSoon: return 'Próximamente';
      case ProjectStatus.Private:    return 'Código privado';
      case ProjectStatus.InProgress: return 'Proyecto en proceso';
      default:                       return 'Ver proyecto';
    }
  }
}
