import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioRequest } from '../Entidad/usuario-request';
import { Observable } from 'rxjs';
import { UsuarioResponse } from '../Entidad/usuario-response';
import { CambiarPasswordRequest } from '../Entidad/cambiar-password-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8014/auth/';

  login(username: string, password: string, rol: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('rol', rol);
  }

  registrar(usuario: UsuarioRequest): Observable<any> {
    return this.http.post(this.url + 'registrar', usuario);
  }

  cambiarPassword(dto: CambiarPasswordRequest): Observable<any> {
    return this.http.put(this.url + 'cambiar-password', dto, {
      responseType: 'text'
    });
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('rol');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

  isAdmin(): boolean {
    return localStorage.getItem('rol') === 'ROLE_ADMIN';
  }

  isUser(): boolean {
    return localStorage.getItem('rol') === 'ROLE_USER';
  }
  
}
