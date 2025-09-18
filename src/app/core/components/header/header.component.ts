import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgFor, NgOptimizedImage } from '@angular/common';
import { filter } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { FontLoaderService } from '../../font-loader.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink, RouterLinkActive, NgClass, NgOptimizedImage, NgFor]

})
export class HeaderComponent implements OnInit {

  constructor(private fonts: FontLoaderService) {}

  private router = inject(Router);

  // === API / logos desde tu backend ===
  API = environment.API_BASE_URL;
  logoUrl = `${this.API}/icons/yo2.svg`;        // tu logo
  // si tienes versión dark/light, añade otro:
  // logoDarkUrl = `${this.API}/icons/yo_dark.svg`;

  menuOpen = false;
  isScrolled = false;
  isMobile = false;

  links = [
    { label: 'INICIO', path: '/' },
    { label: 'SOBRE MÍ', path: '/about' },
    { label: 'PROYECTOS', path: '/projects' },
    { label: 'CONTACTO', path: '/contact' }
  ];

  ngOnInit(): void {
    this.fonts.loadExo2();
    this.updateScreenWidth();

    // Cerrar menú al navegar
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.closeMenu());
  }

  @HostListener('window:scroll')
  onWindowScroll() { this.isScrolled = window.scrollY > 50; }

  @HostListener('document:keydown.escape')
  onEsc() { this.closeMenu(); }

  @HostListener('window:resize')
  onResize() {
    const wasMobile = this.isMobile;
    this.updateScreenWidth();
    if (wasMobile && !this.isMobile) this.closeMenu();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.lockBody(this.menuOpen);
  }

  closeMenu() {
    if (!this.menuOpen) return;
    this.menuOpen = false;
    this.lockBody(false);
  }

  trackByLabel = (_: number, link: { label: string }) => link.label;

  private updateScreenWidth() { this.isMobile = window.innerWidth < 768; }
  private lockBody(lock: boolean) { document.body.style.overflow = lock ? 'hidden' : ''; }
}
