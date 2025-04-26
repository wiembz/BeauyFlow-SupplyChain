import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://127.0.0.1:5000/api'; // ✅ URL backend Flask

  constructor(private http: HttpClient) {}

  // 📩 Récupérer les messages Odoo
  getMessages(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/messages/${userId}`);
  }

  // ✉️ Envoyer un message à un utilisateur
  sendMessage(auteurId: number, destinataireId: number, message: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/chat/send`, {
      auteur_id: auteurId,
      destinataire_id: destinataireId,
      message: message
    });
  }

  // ✅ Récupérer les tâches Odoo assignées à un utilisateur
  getTasks(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tasks/${userId}`);
  }
}
