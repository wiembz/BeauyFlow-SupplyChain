import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    password: '',
    agreeTerms: false
  };

  showPassword = false;
  passwordStrength = 0;
  passwordStrengthText = 'Password strength';

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onPasswordChange() {
    const password = this.registerForm.password;

    // Reset strength
    this.passwordStrength = 0;

    // Check length
    if (password.length >= 8) {
      this.passwordStrength++;
    }

    // Check for uppercase
    if (/[A-Z]/.test(password)) {
      this.passwordStrength++;
    }

    // Check for numbers
    if (/[0-9]/.test(password)) {
      this.passwordStrength++;
    }

    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) {
      this.passwordStrength++;
    }

    // Update text based on strength
    switch (this.passwordStrength) {
      case 0:
        this.passwordStrengthText = 'Weak';
        break;
      case 1:
        this.passwordStrengthText = 'Weak';
        break;
      case 2:
        this.passwordStrengthText = 'Medium';
        break;
      case 3:
        this.passwordStrengthText = 'Strong';
        break;
      case 4:
        this.passwordStrengthText = 'Very Strong';
        break;
      default:
        this.passwordStrengthText = 'Password strength';
    }
  }

  onRegister() {
    // This is just a placeholder for the register functionality
    // In a real app, you would implement actual registration here
    console.log('Register attempt with:', this.registerForm);

    // Navigate to the login page after registration
    this.router.navigate(['/login']);
  }
}
