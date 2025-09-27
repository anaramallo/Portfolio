import {Component, HostListener, OnInit, inject, TrackByFunction} from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgFor, NgOptimizedImage } from '@angular/common';
import { filter } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { FontLoaderService } from '../../font-loader.service';
import {ContactModalService} from "../../../shared/services/contact-modal.service";
type NavLink = { label: string; path: string };

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink, RouterLinkActive, NgClass, NgOptimizedImage, NgFor]
})

export class HeaderComponent implements OnInit {

  constructor(private fonts: FontLoaderService, private contactModal: ContactModalService) {}

  private router = inject(Router);

  // === API / logos desde tu backend ===
  API = environment.API_BASE_URL;
  logoUrl = `${this.API}/icons/yo2.svg`;        // tu logo
  headerBgUrl = `${this.API}/images/header.jpg`;
  menuIconBlack = `${this.API}/icons/menu.svg`;
  menuIconWhite = `${this.API}/icons/menublanco.svg`;
  get menuIcon(): string {
    return this.isScrolled ? this.menuIconBlack : this.menuIconWhite;
  }

  menuOpen = false;
  isScrolled = false;
  isMobile = false;

  links = [
    { label: 'INICIO', path: '/' },
    { label: 'SOBRE MÍ', path: '/about' },
    { label: 'PROYECTOS', path: '/projects' },
  ];

  trackByLabel: TrackByFunction<NavLink> = (_, l) => l.label;

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

  private updateScreenWidth() { this.isMobile = window.innerWidth < 768; }
  private lockBody(lock: boolean) { document.body.style.overflow = lock ? 'hidden' : ''; }

  getLogoClasses() {
    return this.isScrolled ? 'text-black' : 'text-white';
  }

  getLinkClasses() {
    return (this.isScrolled && !this.isMobile) ? 'text-black' : 'text-white';
  }

  onContactClick(e: Event) {
    e.preventDefault();
    this.closeMenu();
    if (this.router.url !== '/') {
      // si no estoy en Inicio, navega a Inicio y luego abre la modal
      this.router.navigateByUrl('/').then(() =>
        setTimeout(() => this.contactModal.open(), 0)
      );
    } else {
      // ya estoy en Inicio: abre directamente
      this.contactModal.open();
    }
  }
}



