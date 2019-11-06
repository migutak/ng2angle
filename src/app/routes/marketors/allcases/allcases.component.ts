import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';
import {Router} from '@angular/router';
import * as _ from 'lodash';
declare var $: any;


@Component({
    selector: 'app-allcases',
    templateUrl: './allcases.component.html',
    styleUrls: ['./allcases.component.scss']
})
export class AllCasesComponent implements OnInit {

    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    public overlayLoadingTemplate;
    public overlayNoRowsTemplate;

    resizeEvent = 'resize.ag-grid';
    $win = $(window);
    new = true;
    username: string;
    searchText: string;
    model: any = {};
    noTotal: number;

    gridOptions: GridOptions;
    gridApi: GridApi;
    // private rowClassRules;

    constructor(private ecolService: EcolService, private http: HttpClient,  private router: Router) {
        this.gridOptions = <GridOptions>{
            headerHeight: 40,
            pagination: true,
            rowSelection: 'single',
            rowModelType: 'infinite',
            cacheBlockSize: 20,
            paginationPageSize: 20
        };

        this.overlayLoadingTemplate =
            // tslint:disable-next-line:max-line-length
            '<span class="ag-overlay-loading-center" style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">Please wait while your rows are loading</span>';
        this.overlayNoRowsTemplate =
            '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is a custom \'no rows\' overlay</span>';
    }

    columnDefs = [
        {
            headerName: 'CARDACCT',
            field: 'cardacct',
            cellRenderer: function (params) {
                return '<a  href="#" target="_blank">' + params.value + '</a>';
            },
            resizable: true,
        },
        {
            headerName: 'CARDNUMBER',
            field: 'cardnumber',
            resizable: true,
            filter: true
        },
        {
            headerName: 'CARDNAME',
            field: 'cardname',
            resizable: true,
            filter: true
        },
        {
            headerName: 'DAYSINARREARS',
            field: 'daysinarrears',
            resizable: true,
            filter: true
        },
        {
            headerName: 'EXPPMNT',
            field: 'exppmnt',
            resizable: true,
        },
        {
            headerName: 'OUTBALANCE',
            field: 'outbalance',
            resizable: true,
        },
        {
            headerName: 'CYCLE',
            field: 'cycle',
            resizable: true,
        }
    ];
    rowData1: any;

    dataSource: IDatasource = {
        getRows: (params: IGetRowsParams) => {

            // Use startRow and endRow for sending pagination to Backend
            // params.startRow : Start Page
            // params.endRow : End Page
            //
            this.apiService(20, params.startRow).subscribe(response => {
                params.successCallback(
                    response, this.noTotal
                );
            });
        }
    };

    onRowDoubleClicked(event: any) {
        this.model = event.node.data;
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink + '/marketorupdate?accnumber=' + this.model.accnumber + '&custnumber=' + this.model.custnumber + '&username=' + this.username + '&sys=marketer', '_blank');
    }

    onQuickFilterChanged($event) {
        // this.gridOptions.api.setQuickFilter($event.target.value);
        this.searchText = $event.target.value;
    }

    onSearch() {
        if (this.model.searchText === undefined) {
            return;
        }
        this.clear();
        this.http.get<any>(environment.api + '/api/marketors/search?searchtext=' + this.model.searchText).subscribe(resp => {
            //
            this.gridApi.updateRowData({ add: resp, addIndex: 0 });
        });
    }

    clear() {
        const ds = {
            getRows(params: any) {
                params.successCallback([], 0);
            }
        };
        this.gridOptions.api.setDatasource(ds);
    }

    reset() {
        // location.reload();
        this.clear();
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;

        
    }

    gridReady(params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    }

    apiService(perPage, currentPos) {
        return this.http.get<any>(environment.api + '/api/marketors?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
    }

    update (id) {
        // redirect to ListComponent
        this.router.navigate(['/marketors/update/' + id]);
      }
    
      addnew () {
        // redirect to ListComponent
        this.router.navigate(['/marketors/newcase']);
      }

}
