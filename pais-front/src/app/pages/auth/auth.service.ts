// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { UsuarioAutenticado } from './login/model/UsuarioAutenticado';
import { UsuarioDTO } from './login/model/UsuarioDTO';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:8080'; // ajuste conforme necessário

  constructor(private http: HttpClient) {}

  login(payload: UsuarioDTO) {
    return this.http.post<UsuarioAutenticado>(`${this.API}/usuario/autenticar`, payload, {
      withCredentials: true // <-- isso envia cookies/sessões se necessário
    }).pipe(
      tap(user => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', user.nome);
        localStorage.setItem('admin', user.administrador ? 'true' : 'false');
      })
    );
  }

  renovarToken(): Observable<boolean> {
    const tokenAtual = this.getToken();

    return this.http.get<{ tokenAutenticado: boolean }>(
      `${this.API}/usuario/renovar-ticket?token=${tokenAtual}`
    ).pipe(
      map(response => response.tokenAutenticado)
    );
  }

  validToken<T>(requestFn: (token: string) => Observable<T>): Observable<T> {
    return this.renovarToken().pipe(
      switchMap((tokenValido) => {
        if (!tokenValido) {
          return throwError(() => new Error('Usuário não está logado.'));
        }
        const token = localStorage.getItem('token');
        return requestFn(token!);
      })
    );
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem('token');
  }

  getAdmin(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem('admin');
  }

  getUser(): UsuarioAutenticado | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
