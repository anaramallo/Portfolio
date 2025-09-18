import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FontLoaderService {
  private injected = false;

  loadExo2() {
    if (this.injected) return;

    const api = environment.API_BASE_URL;
    const woff2Light = `${api}/public/fonts/Exo2-Light.woff2`;
    const ttfLight   = `${api}/public/fonts/Exo2-Light.ttf`;

    // Si subes más pesos, añade aquí (ej: SemiBold 600)
    // const woff2Semi = `${api}/public/fonts/Exo2-SemiBold.woff2`;
    // const ttfSemi   = `${api}/public/fonts/Exo2-SemiBold.ttf`;

    const css = `
@font-face{
  font-family:'Exo 2';
  src: url('${woff2Light}') format('woff2'),
       url('${ttfLight}') format('truetype');
  font-weight:300;
  font-style:normal;
  font-display:swap;
}`

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    this.injected = true;
  }
}
