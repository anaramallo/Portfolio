import { Component, HostListener, OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass, NgFor, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgOptimizedImage,
    NgFor
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  isScrolled = false;
  isMobile = false;

  // Definir los links para la navegación
  links = [
    { label: 'INICIO', path: '/' },
    { label: 'SOBRE MÍ', path: '/about' },
    { label: 'PROYECTOS', path: '/projects' },
    { label: 'CONTACTO', path: '/contact' }
  ];

  ngOnInit(): void {
    this.updateScreenWidth();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateScreenWidth();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;  // Cierra el menú
  }

  private updateScreenWidth(): void {
    this.isMobile = window.innerWidth < 768;
  }
}
