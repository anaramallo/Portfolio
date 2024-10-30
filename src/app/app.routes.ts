import { Routes } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { ContactComponent } from './core/components/contact/contact.component';
import { ProjectsComponent } from './core/components/projects/projects.component';

export const routes: Routes = [
  { path: '', component: HeaderComponent },  //pag naveg ppal
  { path: 'contact', component: ContactComponent },
  { path: 'projects', component: ProjectsComponent }
];
