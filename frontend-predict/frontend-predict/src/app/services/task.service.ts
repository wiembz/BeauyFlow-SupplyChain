import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://127.0.0.1:5000/api'; // adapte si nécessaire

  constructor(private http: HttpClient) { }

  // 📋 Récupérer les tâches assignées à un utilisateur
  getTasks(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/${userId}`);
  }
}
