import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ColorsService } from '../../../shared/colors/colors.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-dashboardv3',
    templateUrl: './dashboardv3.component.html',
    styleUrls: ['./dashboardv3.component.scss']
})
export class Dashboardv3Component implements OnInit {

    metrics: string;

    constructor() {

    }

    ngOnInit() {

    }

}
