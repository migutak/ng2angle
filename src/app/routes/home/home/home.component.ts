import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
declare var $: any;
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    dataSource: any;
    constructor(public http: HttpClient) {
        this.dataSource = {
            chart: {
              caption: 'Book Bucket Distribution',
              subCaption: 'In Ksh Millions ',
              xAxisName: 'Bucket',
              yAxisName: 'Value (in Millions)',
              // numberSuffix: 'K',
              theme: 'fusion'
            },
            data: [
              { label: '0 - 30 Days', value: '290' },
              { label: '31 - 60 Days', value: '260' },
              { label: '61 - 90 Days', value: '180' },
              { label: '91+ Days', value: '140' }
            ]
          };
    }

    ngOnInit() {
        //
        if (localStorage.getItem('profile') === '1') {
            window.location.reload();
        }
        //
        localStorage.setItem('profile', '0');

        this.http.get<any>(environment.nodeapi + '/loans/buckets').subscribe(data => {
            console.log(data);
            this.dataSource.data = data.data;
        }, error => {
            console.log(error);
        });
    }

}
