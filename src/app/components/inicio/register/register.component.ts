import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router, private toastr: ToastrService) {
    this.register = this.fb.group({
      usuario: ['', Validators.required],
      password:['', [Validators.required, Validators.minLength(4)]],
      confirmPassword:['', Validators.required]
    },
    {
      validators: this.checkPassword
    })
   }

   checkPassword(group: FormGroup): any{
      const pass = group.controls.password.value;
      const confirmPass = group.controls.confirmPassword.value;
      
      return pass === confirmPass ? null : {notSame: true};
   }

  ngOnInit(): void {
  }

  registrarUsuario(){
    const usuario: Usuario = {
      nombreUsuario: this.register.value.usuario,
      password: this.register.value.password
    }
    console.log(usuario);
    this.loading = true;
    this.usuarioService.saveUser(usuario).subscribe(resp => {
          this.loading = false;
          this.toastr.success(`El usuario ${usuario.nombreUsuario} ha sido registrado exitosamente`, 'Exito!')
          this.router.navigateByUrl('/inicio/login');
    }, error => {
      this.loading = false;
      this.register.reset();
      this.toastr.error(`${error.error.message}`, 'Error');
    })
  }

  get usuarioValido(){
    return this.register.get('usuario').valid;
  }

  get usuarioNoValido(){
    return this.register.get('usuario').invalid && this.register.get('usuario').touched;
  }

  get passwordValido(){
    return this.register.get('password').valid;
  }

  get passwordNoValidoLength(){
    return this.register.get('password').hasError('minlength') && this.register.get('password').touched;
  }

  get passwordNoValido(){
    return this.register.get('password').invalid && this.register.get('password').touched;
  }

  get confirmPasswordValido(){
    return this.register.get('confirmPassword').valid;
  }

  get confirmPasswordNoCoinciden(){
    return this.register.hasError('notSame') && this.register.get('confirmPassword').touched;
  }
}
