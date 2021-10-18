import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiURL = `${environment.endpoint}/api/Login`;

  constructor(private http: HttpClient) { }

  login(usuario: Usuario):Observable<any>{
    return this.http.post(this.apiURL, usuario);
  }

  setLocalStorage(data): void{
    localStorage.setItem('nombreUsuario', data);
  }

  getNombreUsuario(): string {
    return localStorage.getItem('nombreUsuario' || '');
  }

  removeLocalStorage(): void{
    localStorage.removeItem('nombreUsuario');
  }
}
