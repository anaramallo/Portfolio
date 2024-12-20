import { Routes } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { ContactComponent } from './core/components/contact/contact.component';
import { ProjectsComponent } from './core/components/projects/projects.component';
import {AboutComponent} from "./core/components/about/about.component";
import {InicioComponent } from "./core/components/inicio/inicio.component";

export const routes: Routes = [
  { path: '', component: InicioComponent},  //pag naveg ppal
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent},
  { path: 'contact', component: ContactComponent },



];
