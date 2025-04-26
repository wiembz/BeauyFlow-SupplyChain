import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OdooService {

  private baseUrl = 'http://localhost:5000/api';  // Flask

  constructor(private http: HttpClient) {}

  getMessages(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/messages/${userId}`);
  }

  sendMessage(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/chat/send`, data);
  }

  getTasks(userId: number) {
    return this.http.get<any[]>(`http://127.0.0.1:5000/api/tasks/${userId}`);
  }
  
}
