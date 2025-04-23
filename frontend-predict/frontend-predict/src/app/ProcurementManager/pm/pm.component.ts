import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pm',
  templateUrl: './pm.component.html',
  styleUrls: ['./pm.component.css']
})
export class PMComponent {
   dashboardUrl: SafeResourceUrl;
    
      constructor(private sanitizer: DomSanitizer) {
        this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
'https://app.powerbi.com/reportEmbed?reportId=bd78eaa3-f6c5-4897-b4d5-9f18ec186e86&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'        );
      }
}
