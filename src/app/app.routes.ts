import { Routes } from '@angular/router';
import { ModeloComponent } from './components/modelo/modelo.component';
import { CampoComponent } from './components/campo/campo.component';
import { CadastrarModeloComponent } from './components/modelo/cadastrar-modelo/cadastrar-modelo.component';
import { CadastrarCampoComponent } from './components/campo/cadastrar-campo/cadastrar-campo.component';

export const routes: Routes = [
  { path: 'modelo', component: ModeloComponent },
  { path: 'cadastrar-modelo', component: CadastrarModeloComponent },
  { path: 'cadastrar-modelo/:id', component: CadastrarModeloComponent },
  { path: 'cadastrar-campo', component: CadastrarCampoComponent },
  { path: 'cadastrar-campo/:id', component: CadastrarCampoComponent },
  { path: 'campo', component: CampoComponent },
];
