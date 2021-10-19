import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  loading: boolean = false;

  constructor(private fb:FormBuilder, private toastr: ToastrService, private router: Router, private loginService: LoginService) {
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
      this.loading = true;
      this.loginService.login(usuario).subscribe(resp => {
        this.loading = false;
        this.login.reset();
        this.toastr.success(`Bienvenido`, 'Exito');
        this.loginService.setLocalStorage(resp.token);
        this.router.navigateByUrl('/dashboard');
      }, error => {
        this.loading = false;
        this.login.reset();
        console.log(error);
        this.toastr.error(`${error.error.message}`,'Error');
      });
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
