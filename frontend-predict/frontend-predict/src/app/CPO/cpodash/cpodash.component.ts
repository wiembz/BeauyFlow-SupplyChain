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
  newMessage: string = '';
  userId: number = 9;  // l'ID Odoo du CPO

  constructor(private sanitizer: DomSanitizer, private chatService: ChatService) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://app.powerbi.com/reportEmbed?reportId=6c0b00c7-aebb-45d0-b510-2ce3c0de50d7&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'
    );
    this.loadMessages();
  }

  loadMessages(): void {
    this.chatService.getMessages(this.userId).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.userId, this.userId, this.newMessage).subscribe(() => {
        this.newMessage = '';
        this.loadMessages();
      });
    }
  }
}
