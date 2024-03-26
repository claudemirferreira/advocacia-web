import { Routes } from '@angular/router';
import { DocumentoComponent } from './components/documento/documento.component';
import { ItemModeloComponent } from './components/item-modelo/item-modelo.component';
import { ModeloComponent } from './components/modelo/modelo.component';

export const routes: Routes = [
  { path: 'documento', component: DocumentoComponent },
  { path: 'item-modelo', component: ItemModeloComponent },
  { path: 'modelo', component: ModeloComponent },
];
