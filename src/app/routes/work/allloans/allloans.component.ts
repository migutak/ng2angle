import { Component, OnInit, ViewChild } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';
import * as $ from 'jquery';

@Component({
  selector: 'app-allloans',
  templateUrl: './allloans.component.html',
  styleUrls: ['./allloans.component.scss']
})
export class AllloansComponent implements OnInit {

  public overlayLoadingTemplate;
  public overlayNoRowsTemplate;

  constructor(private ecolService: EcolService, private http: HttpClient) {
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
      '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">Response: \'no rows\' found</span>';

  }


  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;
  username: string;
  searchText: string;
  model: any = {};
  noTotal: number;
  watchTotal: number;

  gridOptions: GridOptions;
  gridApi: GridApi;
  // private rowClassRules;

  columnDefs = [
    {
      headerName: 'ACCNUMBER',
      field: 'ACCNUMBER',
      cellRenderer: function (params) {
        if(params.value !== undefined) {
          return '<a  href="#" target="_blank">' + params.value + '</a>';
        } else {
          return '<img src="assets/img/user/loading.gif">';
        }
      },
      width: 350
    },
    {
      headerName: 'CUSTNUMBER',
      field: 'CUSTNUMBER'
    },
    {
      headerName: 'CUSTNAME',
      field: 'CUSTNAME',
      width: 350
    },
    {
      headerName: 'SETTLEACCNO',
      field: 'SETTLEACCNO'
    },
    {
      headerName: 'BRANCHCODE',
      field: 'BRANCHCODE'
    },
    {
      headerName: 'OUSTBALANCE',
      field: 'OUSTBALANCE'
    },
    {
      headerName: 'PRODUCTCODE',
      field: 'PRODUCTCODE'
    },
    {
      headerName: 'AROCODE',
      field: 'AROCODE'
    },
    {
      headerName: 'NATIONID',
      field: 'NATIONID'
    },
    {
      headerName: 'EMPLOYER',
      field: 'EMPLOYER'
    }
  ];

  rowData1: any;


  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.apiService(20, params.startRow).subscribe(response => {
        params.successCallback(
          response.data, response.totalRecords
        );
        if (response.data.length > 0) {
          this.gridOptions.api.hideOverlay();
        } else {
          this.gridOptions.api.showNoRowsOverlay();
        }
      });
    }
  };

  currencyFormatter(params) {
    return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
  onRowDoubleClicked(event: any) {
    this.model = event.node.data;
    // console.log(this.model);
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/activitylog?accnumber=' + this.model.ACCNUMBER + '&custnumber=' + this.model.CUSTNUMBER + '&username=' + this.currentUser.USERNAME + '&sys=watch', '_blank');
  }

  onSearch() {
    if (this.model.searchText === undefined) {
      return;
    }
    this.clear();
    this.gridApi.showLoadingOverlay();
    this.dataSource = {
      getRows: (params: IGetRowsParams) => {
        this.apiServiceSearch(20, params.startRow).subscribe(response => {
          params.successCallback(
            response.data, response.totalRecords
          );
          if (response.data.length > 0) {
            this.gridOptions.api.hideOverlay();
          } else {
            this.gridOptions.api.showNoRowsOverlay();
          }
        });
      }
    };

    this.gridApi.setDatasource(this.dataSource);
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
    this.gridApi.showLoadingOverlay();
    this.clear();
    this.dataSource = {
      getRows: (params: IGetRowsParams) => {
        // Use startRow and endRow for sending pagination to Backend
        // params.startRow : Start Page
        // params.endRow : End Page
        //
        this.apiService(20, params.startRow).subscribe(response => {
          params.successCallback(
            response.data, response.totalRecords
          );
          if (response.data.length > 0) {
            this.gridOptions.api.hideOverlay();
          } else {
            this.gridOptions.api.showNoRowsOverlay();
          }
        });
      }
    };
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource);
  }

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  }

  gridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource);
    this.gridOptions.api.showLoadingOverlay();
  }

  apiService(perPage, currentPos) {
    // return this.http.get<any>(environment.api + '/api/qall?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(environment.nodeapi + '/watch/allloans?offset=' + currentPos + '&rows=' + perPage );
  }

  apiServiceSearch(perPage, currentPos) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(environment.nodeapi + '/watch/allloans_search?searchtext=' + this.model.searchText + '&rows=' + perPage + '&offset=' + currentPos);
  }

}
