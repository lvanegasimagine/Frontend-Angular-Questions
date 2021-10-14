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
    })
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

  get confirmPasswordNoValido(){
    return this.register.get('confirmPassword').invalid && this.register.get('confirmPassword').touched;
  }
}
