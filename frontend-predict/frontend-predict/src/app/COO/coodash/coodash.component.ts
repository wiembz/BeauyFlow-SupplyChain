import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-coodash',
  templateUrl: './coodash.component.html',
  styleUrls: ['./coodash.component.css']
})
export class COODashComponent implements OnDestroy {
  dashboardUrl: SafeResourceUrl;
  messages: any[] = [];
  users: any[] = [];
  newMessage: string = '';
  selectedDestinataireId: number | null = null;
  userId: number = 9; // COO
  showMessages = false;
  showNewMessage = false;
  messageSent = false;

  refreshSubscription!: Subscription;

  constructor(
    private sanitizer: DomSanitizer,
    private chatService: ChatService,
    private userService: UserService
  ) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
'https://app.powerbi.com/reportEmbed?reportId=2898bad5-3d33-4125-ab85-e30f0aaaa67d&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'  
    );
    this.loadMessages();
    this.loadUsers();

    // ⏰ Auto-refresh toutes les 5 secondes
    this.refreshSubscription = interval(5000).subscribe(() => {
      if (this.showMessages) {  // seulement si la section "Messages" est ouverte
        this.loadMessages();
      }
    });
  }

  loadMessages(): void {
    this.chatService.getMessages(this.userId).subscribe({
      next: (data) => {
        this.messages = data;
      },
      error: (err) => {
        console.error('Erreur chargement messages:', err);
      }
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Erreur chargement users:', err);
      }
    });
  }

  toggleMessages(): void {
    this.showMessages = !this.showMessages;
    this.showNewMessage = false;
    this.messageSent = false;
  }

  toggleNewMessage(): void {
    this.showNewMessage = !this.showNewMessage;
    this.showMessages = false;
    this.messageSent = false;
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedDestinataireId) {
      this.chatService.sendMessage(this.userId, this.selectedDestinataireId, this.newMessage)
        .subscribe({
          next: () => {
            this.newMessage = '';
            this.selectedDestinataireId = null;
            this.messageSent = true;
            this.showNewMessage = false;
            this.loadMessages();
            setTimeout(() => {
              this.messageSent = false;
            }, 3000);
          },
          error: (err) => {
            console.error('Erreur envoi:', err);
          }
        });
    }
  }

  ngOnDestroy(): void {
    // Stopper l'intervalle quand l'utilisateur quitte le composant
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
