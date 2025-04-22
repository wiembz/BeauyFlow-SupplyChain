import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  predict() {
    this.http.post<any>('http://127.0.0.1:5000/predict', this.formData)
      .subscribe(
        (response) => {
          this.prediction = response;
        },
        (error) => {
          console.error('Erreur lors de la prédiction :', error);
        }
      );
  }
}
