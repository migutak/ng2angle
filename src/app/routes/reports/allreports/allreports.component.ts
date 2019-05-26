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
        window.open(environment.birt + '/app/kibana', '_blank');
    }

    open(report) {
        window.open(environment.birt + report, '_blank');
    }

}
