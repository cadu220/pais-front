import { Component } from '@angular/core';
import { PaisService } from '../pais.service';
import { Pais } from '../model/Pais';
import { AuthService } from '../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-paises-list',
  standalone: false,
  templateUrl: './paises-list.component.html',
  styleUrl: './paises-list.component.scss'
})
export class PaisesListComponent {
  paises: Pais[] = [];
  loading = true;
  filtro = ''
  isAdmin: string | null = '';

  constructor(private paisService: PaisService, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.paisService.getAll().subscribe({
      next: (res) => {
        this.paises = res;
        this.loading = false;
      },
      error: (err) => {
        this.snackBar.open(err.message || 'Erro ao buscar países', 'Fechar', {
          duration: 3000
        });
        this.loading = true;
      }
    });
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este país?')) {
      this.paisService.delete(id).subscribe(() => {
        this.paises = this.paises.filter(p => p.id !== id);
      });
    }
  }

  pesquisar(filtro: string): void {
      this.paisService.pesquisar(filtro).subscribe({
        next: (data) => {
          this.paises = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.snackBar.open('Erro ao buscar países', 'Fechar', {
            duration: 3000
          });
        }
      });
  }

  sair() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getAdmin(): boolean{
    this.isAdmin = this.authService.getAdmin();
      return this.isAdmin === 'true';
  }
}
