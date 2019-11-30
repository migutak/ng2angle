import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-portal',
    templateUrl: './portal.component.html',
    styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

    ngOnInit() { }

    openPortal() {
        window.open(environment.portal, '_blank')
    }

}
