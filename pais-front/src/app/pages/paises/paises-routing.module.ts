import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisesListComponent } from './paises-list/paises-list.component';
import { PaisesEditComponent } from './paises-edit/paises-edit.component';

const routes: Routes = [
  { path: 'list', component: PaisesListComponent },
  { path: 'new', component: PaisesEditComponent },
  { path: 'edit/:id', component: PaisesEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
