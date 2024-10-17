import { Component, EventEmitter, Output } from '@angular/core';
import { LoginModel } from '../login/login.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  loginForm: FormGroup;
  passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$';


  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  closeMe() {
    this.closeMeEvent.emit();
  }
  
  confirm() { 
    if (this.loginForm.valid) {
      const loginData = new LoginModel(
        this.loginForm.value.username,
        this.loginForm.value.password
      );
      this.confirmEvent.emit(loginData);
    }

    
  }

}
