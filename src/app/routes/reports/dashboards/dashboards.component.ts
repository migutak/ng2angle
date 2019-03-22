import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';


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

    onNavigate(reportname) {
        window.open('activitydash?report=' + reportname, '_blank');
    }

}
