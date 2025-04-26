import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChatService } from '../../services/chat.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-coodash',
  templateUrl: './coodash.component.html',
  styleUrls: ['./coodash.component.css']
})
export class COODashComponent {
   dashboardUrl: SafeResourceUrl;
   messages: any[] = [];

   auteurId = 9; // 👈 ID du CPO (toi)
   
 
    constructor(private sanitizer: DomSanitizer,private chatService: ChatService) {
      this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
'https://app.powerbi.com/reportEmbed?reportId=2898bad5-3d33-4125-ab85-e30f0aaaa67d&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'  
);  }
ngOnInit() {
  this.getMessages();
}

getMessages() {
  this.chatService.getMessages(this.auteurId).subscribe(
    (response) => {
      this.messages = response; // ✅ stocke les messages
      console.log('📩 Messages récupérés:', this.messages);
    },
    (error) => {
      console.error('❌ Erreur lors de la récupération des messages', error);
    }
  );
}

}
