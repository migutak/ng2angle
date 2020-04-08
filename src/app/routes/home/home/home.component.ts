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
    single: any[]
    

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

    /*colorScheme = {
        domain: ['#5AA454', '#AAAAAA', '#C7B42C', '#A10A28']
    };*/

    colorScheme = 'cool'; // forest, neons, cool, horizon


    onSelect(event) {
        console.log(event);
    }

    constructor(public http: HttpClient, private ecolService: EcolService, ) {
        this.homedash = environment.homedash;
        //Object.assign(this, {single})

        
        this.getbranches();
        this.getbucket();
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

        /*this.http.get<any>(environment.nodeapi + '/loans/buckets').subscribe(data => {
            this.dataSource.data = data.data;
        }, error => {
            console.log(error);
        });*/
    }

    onChange($event) {
        console.log($event);
    }

    getbranches(){
        this.ecolService.getbranches().subscribe(branches => {
            this.branches = branches;
        })
    }

    getbucket(){
        this.ecolService.buckets().subscribe(data => {
            this.single = [
                {
                  "name": "01 - 30 Days",
                  "value": data.data[0].VALUE
                },
                {
                  "name": "31 - 60 Days",
                  "value": data.data[1].VALUE
                },
                {
                  "name": "61 - 90 Days",
                  "value": data.data[2].VALUE
                },
                {
                  "name": "Over 90 Days",
                  "value": data.data[3].VALUE
                }
              ];
        })
    }

}
