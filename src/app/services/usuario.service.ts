import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api: string = `${environment.endpoint}/api/usuario`;

  constructor(private http: HttpClient) { }

  saveUser(usuario: Usuario):Observable<any>{
    return this.http.post(this.api, usuario);
  }
}
