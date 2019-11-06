import { Component, OnInit, ViewChild } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';
import * as $ from 'jquery';

@Component({
  selector: 'app-ptps',
  templateUrl: './ptps.component.html',
  styleUrls: ['./ptps.component.scss']
})
export class PtpsComponent implements OnInit {

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

  gridOptions: GridOptions;
  gridApi: GridApi;
  // private rowClassRules;

  columnDefs = [
    {
      headerName: 'ACCNUMBER',
      field: 'ACCNUMBER',
      cellRenderer: function (params) {
        return '<a  href="#" target="_blank">' + params.value + '</a>';
      },
      width: 350
    },
    {
      headerName: 'STATUS',
      field: 'MET'
    },
    {
      headerName: 'CUST_NAME',
      field: 'client_name',
      width: 350
    },
    {
      headerName: 'PTPAMOUNT',
      field: 'PTPAMOUNT',
    },
    {
      headerName: 'PTPDATE',
      field: 'PTPDATE'
    },
    {
      headerName: 'ACTIONDATE',
      field: 'ACTIONDATE'
    },
    {
      headerName: 'PAYMETHOD',
      field: 'PAYMETHOD'
    },
    {
      headerName: 'OWNER',
      field: 'OWNER'
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
    window.open(environment.applink + '/activitylog?accnumber=' + this.model.accnumber + '&custnumber=' + this.model.custnumber + '&username=' + this.currentUser.USERNAME + '&sys=collections', '_blank');
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
    this.gridApi.showLoadingOverlay();
    this.dataSource = {
      getRows: (params: IGetRowsParams) => {
        this.apiServiceSearch(20, params.startRow).subscribe(response => {
          console.log(response);
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
    return this.http.get<any>(environment.nodeapi + '/brokenptps/all?offset=' + currentPos + '&rows=' + perPage);
  }

  apiServiceSearch(perPage, currentPos) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(environment.nodeapi + '/brokenptps/all_search?searchtext=' + this.model.searchText + '&rows=' + perPage + '&offset=' + currentPos);
  }


}
