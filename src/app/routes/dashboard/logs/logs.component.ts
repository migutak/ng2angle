import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss']
})

export class LogsComponent implements OnInit {

    metrics: string;
    
    url: string = environment.platformDash;
    urlSafe: SafeResourceUrl;

    constructor(private domSanitizer : DomSanitizer) {
    }

    ngOnInit() {

       this.urlSafe= this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
    }

}
