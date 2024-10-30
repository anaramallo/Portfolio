import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {AboutComponent} from "./core/components/about/about.component";
import {ContactComponent} from "./core/components/contact/contact.component";
import {ProjectsComponent} from "./core/components/projects/projects.component";
import {HeaderComponent} from "./core/components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AboutComponent, ContactComponent, ProjectsComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Portfolio';

  // Este decorador escucha el evento scroll en la ventana
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {  // Cambia a partir de 100px de scroll
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }
}

