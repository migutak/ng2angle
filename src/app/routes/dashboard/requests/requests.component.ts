import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.scss']
})

export class RequestsComponent implements OnInit {

    metrics: string;
    
    url: string = environment.requestsDash;
    urlSafe: SafeResourceUrl;

    constructor(private domSanitizer : DomSanitizer) {
    }

    ngOnInit() {

       this.urlSafe= this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
    }

}
