import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-scpmdash',
  templateUrl: './scpmdash.component.html',
  styleUrls: ['./scpmdash.component.css']
})
export class SCPMDashComponent {
  dashboardUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
'https://app.powerbi.com/reportEmbed?reportId=55dddfc1-f8ae-4fba-bb09-92f2972c535b&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'
);
  }
}
