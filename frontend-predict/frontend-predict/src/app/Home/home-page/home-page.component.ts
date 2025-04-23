import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  dashboardUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://app.powerbi.com/reportEmbed?reportId=bd78eaa3-f6c5-4897-b4d5-9f18ec186e86&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&pageName=ReportSection4a09280d221014721dd1&navContentPaneEnabled=false&filterPaneEnabled=false'
    );
  }    
}
