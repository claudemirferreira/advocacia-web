import { Routes } from '@angular/router';
import { ModeloComponent } from './components/modelo/modelo.component';
import { CadastrarModeloComponent } from './components/modelo/cadastrar-modelo/cadastrar-modelo.component';
import { CadastrarPalavraChaveComponent } from './components/palavra-chave/cadastrar-palavra-chave/cadastrar-palavra-chave.component';
import { PalavraChaveComponent } from './components/palavra-chave/palavra-chave.component';

export const routes: Routes = [
  { path: 'modelo', component: ModeloComponent },
  { path: 'cadastrar-modelo', component: CadastrarModeloComponent },
  { path: 'cadastrar-modelo/:id', component: CadastrarModeloComponent },
  { path: 'cadastrar-palavra-chave', component: CadastrarPalavraChaveComponent },
  { path: 'cadastrar-palavra-chave/:id', component: CadastrarPalavraChaveComponent },
  { path: 'palavra-chave', component: PalavraChaveComponent },
];
