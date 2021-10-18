import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  cambiarPassword: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private toastr: ToastrService, private router: Router) {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['']
    },
    {
      validators: this.checkPassword
    })
   }

   checkPassword(group: FormGroup): any{
    const pass = group.controls.nuevaPassword.value;
    const confirmPass = group.controls.confirmPassword.value;
    
    return pass === confirmPass ? null : {notSame: true};
 }

  ngOnInit(): void {
  }

  guardarPassword(){
    const changePassword: any = {
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      nuevaPassword: this.cambiarPassword.value.nuevaPassword
    }
    this.loading = true;
    this.usuarioService.changePassword(changePassword).subscribe(data => {
      this.router.navigateByUrl('/dashboard');
      this.toastr.info(data.message);
    }, error => {
      this.loading = false;
      this.cambiarPassword.reset();
      this.toastr.error(error.error.message, 'Error!');
    })
  }

  get passwordAnteriorValido(){
    return this.cambiarPassword.get('passwordAnterior').valid;
  }
  
  get passwordAnteriorNoValido(){
    return this.cambiarPassword.get('passwordAnterior').invalid && this.cambiarPassword.get('passwordAnterior').touched;
  }

  get nuevaPasswordValida(){
    return this.cambiarPassword.get('nuevaPassword').valid
  }

  get nuevaPasswordNoValidaLength(){
    return this.cambiarPassword.get('nuevaPassword').hasError('minlength') && this.cambiarPassword.get('nuevaPassword').touched;
  }

  get confirmPasswordValido(){
    return this.cambiarPassword.get('confirmPassword').valid && this.cambiarPassword.get('confirmPassword').touched;
  }

  get confirmPasswordNoCoinciden(){
    return this.cambiarPassword.hasError('notSame') && this.cambiarPassword.get('confirmPassword').touched;
  }
}
