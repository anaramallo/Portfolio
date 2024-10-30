import { Component, HostListener, OnInit } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    NgClass
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuOpen = false;

  ngOnInit(): void {
    this.onWindowScroll(); // Asegúrate de aplicar el efecto al cargar
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
