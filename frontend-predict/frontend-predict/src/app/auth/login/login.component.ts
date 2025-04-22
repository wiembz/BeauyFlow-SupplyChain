import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = {
    email: '',
    password: '',
    rememberMe: false
  };

  showPassword = false;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    // This is just a placeholder for the login functionality
    // In a real app, you would implement actual authentication here
    console.log('Login attempt with:', this.loginForm);

    // Navigate to the predict page after login
    this.router.navigate(['/predict']);
  }
}
