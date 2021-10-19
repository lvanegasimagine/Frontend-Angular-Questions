import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    localStorage.setItem('token', data);
  }

  // getNombreUsuario(): string {
  //   return localStorage.getItem('nombreUsuario' || '');
  // }

  getTokenDecoded(): any{
    const helper = new JwtHelperService();
 
    const decodedToken = helper.decodeToken(localStorage.getItem('token' || ''));
    return decodedToken;
  }

  removeLocalStorage(): void{
    localStorage.removeItem('token');
  }
}
