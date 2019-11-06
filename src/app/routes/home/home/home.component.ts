import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
declare var $: any;
import { environment } from '../../../../environments/environment';
import { EcolService } from '../../../services/ecol.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    dataSource: any;
    dataSource2: any;
    constructor(public http: HttpClient, private ecolService: EcolService,) {
        this.dataSource = {
            chart: {
              caption: 'Book Bucket Distribution',
              subCaption: 'In Ksh Millions ',
              xAxisName: 'Bucket',
              yAxisName: 'Value (in Millions)',
              numberScaleValue: '1000,1000,1000',
              numberScaleUnit: 'K,M,B',
              // numberSuffix: 'K',
              theme: 'fusion'
            },
            // data: [
            //   { label: '0 - 30 Days', value: '290' },
            //   { label: '31 - 60 Days', value: '260' },
            //   { label: '61 - 90 Days', value: '180' },
            //   { label: '91+ Days', value: '140' }
            // ]
          };


          this.dataSource2 = {
            chart: {
              caption: 'McoopCash Category Distribution',
              subCaption: 'In Ksh Millions ',
              xAxisName: 'Arrears Category',
              yAxisName: 'Values',
              numberScaleValue: '1000,1000,1000',
              numberScaleUnit: 'K,M,B',
              // numberSuffix: 'K',
              theme: 'fusion'
            },
            // data: [
            //   { label: '0 - 30 Days', value: '290' },
            //   { label: '31 - 60 Days', value: '260' },
            //   { label: '61 - 90 Days', value: '180' },
            //   { label: '91+ Days', value: '140' }
            // ]
          };
    }

    ngOnInit() {
        // check if logged in
        this.ecolService.ifLogged();
        this.ecolService.ifclosed();
        //
        if (localStorage.getItem('profile') === '1') {
            window.location.reload();
        }
        //
        localStorage.setItem('profile', '0');

        this.http.get<any>(environment.nodeapi + '/loans/buckets').subscribe(data => {
            this.dataSource.data = data.data;
        }, error => {
            console.log(error);
        });

        this.http.get<any>(environment.nodeapi + '/loans/arrearscategory').subscribe(data2 => {
            this.dataSource2.data = data2.data;
        }, error => {
            console.log(error);
        });
    }

}
