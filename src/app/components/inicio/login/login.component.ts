import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(private fb:FormBuilder) {
    this.login = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  log(){
      const usuario: Usuario = {
        nombreUsuario: this.login.get('usuario').value,
        password: this.login.get('password').value
      }
      console.log(usuario);
  }

  get usuarioValido(){
    return this.login.get('usuario')?.valid;
  }

  get usuarioNoValido(){
    return this.login.get('usuario')?.invalid && this.login.get('usuario')?.touched;
  }

  get passValido(){
    return this.login.get('password')?.valid;
  }
  
  get passNoValido(){
    return this.login.get('password')?.invalid && this.login.get('password')?.touched;
  }
}
