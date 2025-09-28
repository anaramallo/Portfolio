import { Component, HostListener, OnInit, TrackByFunction } from '@angular/core';
import { NgClass, NgFor, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { FontLoaderService } from '../../font-loader.service';
import { ContactModalService } from "../../../shared/services/contact-modal.service";

type NavLink = { label: string; fragment: string };

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [NgClass, NgOptimizedImage, NgFor]
})
export class HeaderComponent implements OnInit {

  constructor(
    private fonts: FontLoaderService,
    private contactModal: ContactModalService
  ) {}

  // API URLs
  API = environment.API_BASE_URL;
  logoDark = `${this.API}/icons/arg_blancas.svg`;
  logoLight = `${this.API}/icons/arg_lilight.svg`;
  menuIconBlack = `${this.API}/icons/menu.svg`;
  menuIconWhite = `${this.API}/icons/menublanco.svg`;

  // Component state
  menuOpen = false;
  isScrolled = false;
  isMobile = false;

  // Navigation links
  links: NavLink[] = [
    { label: 'INICIO', fragment: 'home' },
    { label: 'SOBRE MÍ', fragment: 'about-text' },
    { label: 'PROYECTOS', fragment: 'projects-text' },
  ];

  trackByLabel: TrackByFunction<NavLink> = (_, link) => link.label;

  // Getters
  get menuIcon(): string {
    return this.isScrolled ? this.menuIconBlack : this.menuIconWhite;
  }

  get logoUrl(): string {
    return this.isScrolled ? this.logoDark : this.logoLight;
  }

  // Lifecycle
  ngOnInit(): void {
    this.fonts.loadExo2();
    this.updateScreenWidth();
  }

  // Event listeners
  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.closeMenu();
  }

  @HostListener('window:resize')
  onResize() {
    const wasMobile = this.isMobile;
    this.updateScreenWidth();
    if (wasMobile && !this.isMobile) this.closeMenu();
  }

  // Menu methods
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  closeMenu() {
    if (!this.menuOpen) return;
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  // Navigation methods
  onLinkClick(link: NavLink, event: Event) {
    event.preventDefault();
    this.closeMenu();
    this.scrollToSection(link.fragment);
  }

  onContactClick(event: Event) {
    event.preventDefault();
    this.closeMenu();
    this.contactModal.open();
  }

  // Utility methods
  getLinkClasses() {
    return (this.isScrolled && !this.isMobile) ? 'text-black' : 'text-white';
  }

  private scrollToSection(fragmentId: string) {
    const element = document.getElementById(fragmentId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  private updateScreenWidth() {
    this.isMobile = window.innerWidth < 768;
  }
}
