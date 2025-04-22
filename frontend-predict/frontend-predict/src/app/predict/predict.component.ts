import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent {
  formData = {
    productname: '',
    category: ''
  };

  prediction: any;
  isLoading = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  predict() {
    this.isLoading = true;
    this.error = null;

    this.http.post<any>('http://127.0.0.1:5000/predict', this.formData)
      .subscribe(
        (response) => {
          this.prediction = response;
          this.isLoading = false;
        },
        (error) => {
          console.error('Erreur lors de la prédiction :', error);
          this.error = 'Une erreur est survenue lors du calcul des prédictions. Veuillez réessayer.';
          this.isLoading = false;
        }
      );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
