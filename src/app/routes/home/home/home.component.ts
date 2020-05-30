import { Component, OnInit } from '@angular/core';
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
    homedash: string;

    public portfoliodash = environment.portfoliodash;

    //single: any[];
    branches: any[];
    view: any[] = [1500, 400];
    single: any[];
    volume: any[];
    arocodes: any[];
    productcodes: any[];
    selectedBranch: string;
    selectedarocode: string;
    selectedproduct: string;
    showLegend: boolean = true;
    // options
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    legend: boolean = true;
    legendPosition: string = 'below';
    showXAxisLabel = true;
    xAxisLabel = 'Bucket';
    showYAxisLabel = true;
    yAxisLabel = 'Value (Ksh)';
    label = 'Total No. of Accounts'

    /*colorScheme = {
        domain: ['#5AA454', '#AAAAAA', '#C7B42C', '#A10A28']
    };*/

    colorScheme = 'cool'; // forest, neons, cool, horizon


    onSelect(event) {
        console.log(event);
    }

    constructor(public http: HttpClient, private ecolService: EcolService, ) {
        //this.homedash = environment.homedash;

        this.getbranches();
        this.getbucket();
        this.getarocode();
        this.getproductcode();
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
    }

    onChange($event) {
        console.log($event);
    }

    getarocode() {
        this.http.get<any>(environment.nodeapi + '/loans/arocodes').subscribe(data => {
            this.arocodes = data.data;
        }, error => {
            console.log(error);
        });
    }

    getbranches() {
        this.ecolService.getbranches().subscribe(branches => {
            this.branches = branches;
        }, error => {
            console.log(error);
        });
    }

    getproductcode() {
        this.http.get<any>(environment.nodeapi + '/loans/productcode').subscribe(data => {
            this.productcodes = data.data;
        }, error => {
            console.log(error);
        });
    }

    getbucket() {
        this.ecolService.buckets().subscribe(data => {
            this.single = [
                {
                    "name": "01 - 30 Days",
                    "value": data[0].VALUE
                },
                {
                    "name": "31 - 60 Days",
                    "value": data[1].VALUE
                },
                {
                    "name": "61 - 90 Days",
                    "value": data[2].VALUE
                },
                {
                    "name": "Over 90 Days",
                    "value": data[3].VALUE
                }
            ];

            this.volume = [
                {
                    "name": "01 - 30 Days",
                    "value": data[0].VOLUME
                },
                {
                    "name": "31 - 60 Days",
                    "value": data[1].VOLUME
                },
                {
                    "name": "61 - 90 Days",
                    "value": data[2].VOLUME
                },
                {
                    "name": "Over 90 Days",
                    "value": data[3].VOLUME
                }
            ];
        }, error => {
            console.log(error);
        });
    }

}
