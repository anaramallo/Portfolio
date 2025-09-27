import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactModalService {
  private _open$ = new Subject<void>();
  //Evento que otros componentes pueden escuchar para abrir la modal
  open$ = this._open$.asObservable();

  //Llamar a esto para abrir el modal
  open() { this._open$.next(); }
}
