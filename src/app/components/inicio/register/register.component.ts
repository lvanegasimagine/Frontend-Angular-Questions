import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;

  constructor(private fb: FormBuilder) {
    this.register = this.fb.group({
      email: ['', Validators.required],
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
    console.log(this.register.value);
  }

  get emailValido(){
    return this.register.get('email').valid;
  }

  get emailNoValido(){
    return this.register.get('email').invalid && this.register.get('email').touched;
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
