import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-cpodash',
  templateUrl: './cpodash.component.html',
  styleUrls: ['./cpodash.component.css']
})
export class CPODashComponent {
  dashboardUrl: SafeResourceUrl;
  messages: any[] = [];
  tasks: any[] = [];
  newMessage: string = '';
  userId: number = 8; // 👤 ID du CPO (à rendre dynamique plus tard)

  constructor(
    private sanitizer: DomSanitizer,
    private chatService: ChatService
  ) {
    // 🔗 URL du rapport Power BI sécurisé
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://app.powerbi.com/reportEmbed?reportId=6c0b00c7-aebb-45d0-b510-2ce3c0de50d7&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'
    );

    this.loadMessages();
    this.loadTasks();
  }

  // 📩 Charger les messages depuis Odoo
  loadMessages(): void {
    this.chatService.getMessages(this.userId).subscribe(
      (messages) => {
        this.messages = messages;
        console.log('📩 Messages chargés:', messages);
      },
      (error) => {
        console.error('❌ Erreur chargement messages', error);
      }
    );
  }

  // ✅ Charger les tâches liées à l'utilisateur
  loadTasks(): void {
    this.chatService.getTasks(this.userId).subscribe(
      (data) => {
        this.tasks = data;
        console.log('✅ Tâches chargées:', data);
      },
      (error) => {
        console.error('❌ Erreur chargement tâches', error);
      }
    );
  }

  // ✉️ Envoyer un nouveau message
  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.userId, this.userId, this.newMessage)
        .subscribe(() => {
          this.newMessage = '';
          this.loadMessages(); // 🔄 Rafraîchir la liste
        });
    }
  }
}
