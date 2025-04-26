import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http'; // 🔥 AJOUT

@Component({
  selector: 'app-cpodash',
  templateUrl: './cpodash.component.html',
  styleUrls: ['./cpodash.component.css']
})
export class CPODashComponent {
  dashboardUrl: SafeResourceUrl;
  messages: any[] = [];
  tasks: any[] = [];
  users: any[] = []; // 📦 Liste des utilisateurs
  selectedDestinataireId: number | null = null; // 📍 ID sélectionné

  newMessage: string = '';
  userId: number = 8;  // Ici ID CPO

  constructor(
    private sanitizer: DomSanitizer, 
    private chatService: ChatService,
    private http: HttpClient  // 🔥
  ) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://app.powerbi.com/reportEmbed?reportId=6c0b00c7-aebb-45d0-b510-2ce3c0de50d7&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'
    );
    this.loadMessages();
   // this.loadTasks();
    this.loadUsers(); // 🔥
  }

  loadMessages(): void {
    this.chatService.getMessages(this.userId).subscribe(
      (messages) => {
        this.messages = messages;
        console.log('📩 Messages reçus:', messages);
      },
      (error) => {
        console.error('Erreur récupération messages', error);
      }
    );
  }
  
  

  /*loadTasks() {
    this.chatService.getTasks(this.userId).subscribe(data => {
      this.tasks = data;
    });
  }*/

  loadUsers() {
    this.http.get<any[]>('http://127.0.0.1:5000/api/users').subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Erreur chargement users', error);
      }
    );
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedDestinataireId !== null) {
      this.chatService.sendMessage(this.userId, this.selectedDestinataireId, this.newMessage)
        .subscribe(() => {
          this.newMessage = '';
          this.loadMessages();
        });
    }
  }
}
