import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
declare var $: any;

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

}
