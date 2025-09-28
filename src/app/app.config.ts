import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';

import { routes } from './app.routes';

function setHeaderOffset(vs: ViewportScroller) {
  const set = () => {
    const offset = window.innerWidth < 768 ? 84 : 96; // ajusta a la altura real del header
    vs.setOffset([0, offset]);
  };
  set();
  window.addEventListener('resize', set);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ViewportScroller],
      useFactory: (vs: ViewportScroller) => () => setHeaderOffset(vs)
    }
  ]
};
