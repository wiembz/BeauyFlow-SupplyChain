// src/app/services/message.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl = 'http://127.0.0.1:5000/api/messages'; // 🔥 ton API Flask pour les messages

  constructor(private http: HttpClient) { }

  getMessages(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages/${userId}`);
}
}
