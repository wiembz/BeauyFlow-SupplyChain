import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  auteurId: number = 9; // ID du COO par exemple
  destinataireId: number = 2; // ID de l'admin par exemple
  message: string = '';

  constructor(private chatService: ChatService) {}

  envoyer() {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.auteurId, this.destinataireId, this.message)
        .subscribe(response => {
          console.log('✅ Message envoyé avec succès', response);
          this.message = ''; // Vide le champ après envoi
        }, error => {
          console.error('❌ Erreur lors de l\'envoi du message', error);
        });
    }
  }
}
