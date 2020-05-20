import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;
import { environment } from '../../../../environments/environment';
import { EcolService } from '../../../services/ecol.service';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent implements OnInit {

    single: any[] = [
        {
          "name": "Critical",
          "value": 40632,
          "extra": {
            "code": "de"
          }
        },
        {
          "name": "High",
          "value": 50000,
          "extra": {
            "code": "us"
          }
        },
        {
          "name": "Normal",
          "value": 36745,
          "extra": {
            "code": "fr"
          }
        },
        {
          "name": "Low",
          "value": 36240,
          "extra": {
            "code": "uk"
          }
        }
      ];
    //view: any[] = [700, 400];

    // options
    gradient: boolean = true;
    showLegend: boolean = true;
    showLabels: boolean = true;
    isDoughnut: boolean = false;

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    constructor() {
       // Object.assign(this, { this.single });
    }


    onSelect(data): void {
        console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }

    onActivate(data): void {
        console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data): void {
        console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }

    ngOnInit() {
    }

}
