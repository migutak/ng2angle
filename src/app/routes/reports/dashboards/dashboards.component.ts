import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-dashboards',
    templateUrl: './dashboards.component.html',
    styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
    constructor() {
    }


    public ngOnInit(): void {
    }

    openplatformdash() {
        window.open(environment.platformDash, '_blank');
    }

    openactivityrpt() {
        // window.open(environment.kibana, '_blank');
    }

    openrollrates() {
        window.open(environment.rollratesdash, '_blank');
    }

    openportfoliodash() {
        window.open(environment.portfoliodash, '_blank');
    }

    openuserbuckets() {
        window.open(environment.userbucketdash, '_blank');
    }

}
