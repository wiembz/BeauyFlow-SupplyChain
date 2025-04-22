import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = {
    username: '',
    password: '',
    rememberMe: false
  };

  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.authService.login({
      username: this.loginForm.username,
      password: this.loginForm.password
    }).subscribe(
      () => {
        console.log('Connexion réussie');
        this.router.navigate(['/predict']);
      },
      (error) => {
        console.error('Échec de la connexion :', error);
        alert('Nom d\'utilisateur ou mot de passe incorrect');
      }
    );
  }
}
