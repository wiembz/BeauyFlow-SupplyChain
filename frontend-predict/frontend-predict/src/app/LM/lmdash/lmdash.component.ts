import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lmdash',
  templateUrl: './lmdash.component.html',
  styleUrls: ['./lmdash.component.css']
})
export class LMDashComponent {
    dashboardUrl: SafeResourceUrl;
  
    constructor(private sanitizer: DomSanitizer) {
      this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  'https://app.powerbi.com/reportEmbed?reportId=2868037c-2ff6-49bc-86b3-612724cad2c0&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'
  );
    }
  

}
