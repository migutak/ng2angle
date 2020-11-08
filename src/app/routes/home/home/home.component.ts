import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;
import { ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { EcolService } from '../../../services/ecol.service';
import { WebdatarocksComponent } from '../../../webdatarocks/webdatarocks.component';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    dataSource: any;
    homedash: string;

    public portfoliodash = environment.portfoliodash;

    @ViewChild('pivot1') child: WebdatarocksComponent;

    onPivotReady(pivot: WebDataRocks.Pivot): void {
        console.log('[ready] WebdatarocksComponent', this.child);
    }

    onCustomizeCell(
        cell: WebDataRocks.CellBuilder,
        data: WebDataRocks.CellData
    ): void {
        if (data.isClassicTotalRow) {
            cell.addClass('fm-total-classic-r');
        }
        if (data.isGrandTotalRow) {
            cell.addClass('fm-grand-total-r');
        }
        if (data.isGrandTotalColumn) {
            cell.addClass('fm-grand-total-c');
        }
    }

    onReportComplete(): void {
        this.child.webDataRocks.off('reportcomplete');
        this.child.webDataRocks.setReport({
            dataSource: {
                //filename: 'https://cdn.webdatarocks.com/data/data.json',
                //filename: 'http://127.0.0.1:8000/api/tqall?filter[where][productcode]=MortCnstPPMTLoan',
            },
/*
            slice: {
                rows: [
                    { uniqueName: 'Category' }
                ],
                columns: [
                    { uniqueName: 'Destination' }
                ],
                measures: [
                    { uniqueName: 'Category', aggregation: 'count' },
                    { uniqueName: 'Price', aggregation: 'sum' }
                ]
            }*/
            slice: {
                rows: [
                    { uniqueName: 'bucket' }
                ],
                columns: [
                    { uniqueName: 'branchname' }
                ],
                measures: [
                    { uniqueName: 'accnumber', aggregation: 'count' },
                    { uniqueName: 'oustbalance', aggregation: 'sum' }
                ]
            }
        });
    }

    constructor(public http: HttpClient, private ecolService: EcolService,) {

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

    opendash() {
        window.open("http://172.16.19.151:5601/app/kibana#/dashboard/8eaf9600-d70d-11ea-9a3b-a19986078728?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A10000)%2Ctime%3A(from%3Anow-1h%2Cto%3Anow))"
            , "_blank")
    }

}
