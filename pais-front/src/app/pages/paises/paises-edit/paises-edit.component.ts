import { Component } from '@angular/core';
import { Pais } from '../model/Pais';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisService } from '../pais.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-paises-edit',
  standalone: false,
  templateUrl: './paises-edit.component.html',
  styleUrl: './paises-edit.component.scss'
})
export class PaisesEditComponent {
  form: FormGroup;
  editando = false;
  paisId?: number;


  constructor(
    private fb: FormBuilder,
    private paisService: PaisService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(20)]],
      sigla: ['', [Validators.required, Validators.maxLength(2)]],
      gentilico: ['', [Validators.required, Validators.maxLength(25)]],
      id: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.paisId = +id;
      this.paisService.getById(this.paisId).subscribe({
        next: (pais) =>{
           this.form.patchValue(pais)},
        error: () =>  this.snackBar.open('Erro ao carregar País', 'Fechar', {
          duration: 3000
        })
      });
    }
  }

  salvar(): void {
    const pais: Pais = this.form.value;
      this.paisService.create(pais).subscribe({
        next: () => this.router.navigate(['/paises/list']),
        error: () => this.snackBar.open('Erro ao salvar país', 'Fechar', {
          duration: 3000
        })
      });
  }

  cancelar(): void {
    this.router.navigate(['/paises/list']);
  }
}
