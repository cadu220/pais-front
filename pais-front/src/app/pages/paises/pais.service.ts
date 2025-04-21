import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, Observable, switchMap, throwError } from 'rxjs';
import { Pais } from './model/Pais';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private API = 'http://localhost:8080/pais';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<Pais[]> {
    return this.authService.validToken((token) =>
      this.http.get<Pais[]>(`${this.API}/listar?token=${token}`)
    );
  }
  getById(id: number): Observable<Pais> {
    return this.authService.validToken((token) =>
       this.http.get<Pais>(`${this.API}/${id}?token=${token}`)
    );
  }

  create(pais: Pais): Observable<Pais> {
    return this.authService.validToken((token) =>
      this.http.post<Pais>(`${this.API}/salvar?token=${token}`, pais)
    );
  }

  delete(id: number): Observable<Pais> {
    return this.authService.validToken((token) =>
      this.http.delete<any>(`${this.API}/excluir/${id}?token=${token}`)
    );
  }

  pesquisar(filtro: string): Observable<Pais[]> {
    return this.authService.validToken((token) =>
      this.http.get<Pais[]>(`${this.API}/pesquisar/${filtro}?token=${token}`)
    );
  }
}
