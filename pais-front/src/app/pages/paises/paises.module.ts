import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PaisesListComponent } from './paises-list/paises-list.component';
import { PaisesRoutingModule } from './paises-routing.module';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PaisesEditComponent } from './paises-edit/paises-edit.component';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    PaisesListComponent,
    PaisesEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatTableModule,
    PaisesRoutingModule,
    MatIconModule,
    FormsModule
  ]
})
export class PaisesModule { }
