import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactModalService {
  private _open$ = new Subject<void>(); // Cambiar * por _

  //Evento que otros componentes pueden escuchar para abrir la modal
  open$ = this._open$.asObservable(); // Cambiar * por _

  //Llamar a esto para abrir el modal
  open() {
    this._open$.next();
  }
}
