import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
declare var $: any;
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-allreports',
    templateUrl: './allreports.component.html',
    styleUrls: ['./allreports.component.scss']
})
export class AllReportsComponent implements OnInit {

    ngOnInit() { }

    onNavigate(reportname) {
        window.open('activitydash?report=' + reportname, '_blank');
    }

    openactivityrpt() {
        window.open(environment.birt + '/frameset?__report=collectoractivity_test2.rptdesign&__title=Activity Report', '_blank');
    }

    open(report) {
        window.open(environment.birt + report, '_blank');
    }

}
