import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';


@Component({
    selector: 'app-newcase',
    templateUrl: './newcase.component.html',
    styleUrls: ['./newcase.component.scss']
})
export class NewcaseComponent implements OnInit {
    data: any = {}
    constructor() {
    }


    public ngOnInit(): void {
    }

    onNavigate(reportname) {
        window.open('activitydash?report=' + reportname, '_blank');
    }

}
