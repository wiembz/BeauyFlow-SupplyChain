import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cpodash',
  templateUrl: './cpodash.component.html',
  styleUrls: ['./cpodash.component.css']
})
export class CPODashComponent {
  dashboardUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
'https://app.powerbi.com/reportEmbed?reportId=6c0b00c7-aebb-45d0-b510-2ce3c0de50d7&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'
);
  }
}
