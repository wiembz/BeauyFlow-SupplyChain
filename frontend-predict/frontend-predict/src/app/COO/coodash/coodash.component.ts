import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-coodash',
  templateUrl: './coodash.component.html',
  styleUrls: ['./coodash.component.css']
})
export class COODashComponent {
   dashboardUrl: SafeResourceUrl;
  
    constructor(private sanitizer: DomSanitizer) {
      this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
'https://app.powerbi.com/reportEmbed?reportId=2898bad5-3d33-4125-ab85-e30f0aaaa67d&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'  
);  }

}
