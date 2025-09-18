import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';
import {NgStyle} from "@angular/common";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {

  API = environment.API_BASE_URL;
  aboutImageUrl: string = `${this.API}/images/yo.jpg`;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Seleccionar todos los elementos que queremos observar
    const elementsToAnimate = this.el.nativeElement.querySelectorAll('.animate-on-scroll');

    // Opciones para el observer
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    // Crear el observer
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Añadir la clase de animación cuando el elemento entra en la vista
          this.renderer.addClass(entry.target, 'animate-slide-in-visible');
          observer.unobserve(entry.target); // Dejar de observar este elemento después de animarlo
        }
      });
    }, options);

    // Observar cada uno de los elementos
    elementsToAnimate.forEach((element: any) => {
      observer.observe(element);
    });


}
}
