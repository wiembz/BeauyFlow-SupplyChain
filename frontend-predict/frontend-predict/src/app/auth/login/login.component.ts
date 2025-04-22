import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.post<any>('http://127.0.0.1:5000/login', {
      username: this.loginForm.username,
      password: this.loginForm.password
    }, { headers }).subscribe(
      (response) => {
        if (response.success) {
          console.log('Connexion réussie');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/predict']);
        } else {
          alert('Échec de la connexion');
        }
      },
      (error) => {
        console.error('Échec de la connexion :', error);
        alert('Nom d’utilisateur ou mot de passe incorrect');
      }
    );
  }
}
