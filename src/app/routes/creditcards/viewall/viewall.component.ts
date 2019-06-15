import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as $ from 'jquery';
import { EcolService } from '../../../services/ecol.service';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent implements OnInit {

  public overlayLoadingTemplate;
  public overlayNoRowsTemplate;

  constructor(private ecolService: EcolService, private http: HttpClient) {
    this.gridOptions = <GridOptions>{
      // floatingFilter: true,
      headerHeight: 0,
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


  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;
  username: string;
  searchText: string;
  model: any = {};
  noTotal: number;
  searchTotal: number;

  gridOptions: GridOptions;
  gridApi: GridApi;
  // private rowClassRules;

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
      headerName: 'OUTSTANDING BALANCE',
      field: 'outbalance',
      resizable: true,
    },
    {
      headerName: 'LIMIT',
      field: 'limit',
      resizable: true,
    },
    {
      headerName: 'CYCLE',
      field: 'cycle',
      resizable: true,
    },
    {
      headerName: 'COLOFFICER',
      field: 'colofficer',
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
    // console.log(this.model);
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/activitylog?accnumber=' + this.model.cardacct + '&custnumber=' + this.model.cardacct + '&username=' + this.username + '&sys=cc', '_blank');
  }

  onQuickFilterChanged($event) {
    // this.gridOptions.api.setQuickFilter($event.target.value);
    this.searchText = $event.target.value;
  }

  onSearch() {
    /*if (this.model.searchText === undefined) {
      return;
    }*/
    this.clear();

    this.ecolService.totalcreditcardsearch(this.model.searchText).subscribe(viewall => {
      this.searchTotal = viewall[0].TOTALVIEWALL;
    });

    this.columnDefs = [
      {
        headerName: 'CARDACCT',
        field: 'CARDACCT',
        cellRenderer: function (params) {
          return '<a  href="#" target="_blank">' + params.value + '</a>';
        },
        resizable: true,
      },
      {
        headerName: 'CARDNUMBER',
        field: 'CARDNUMBER',
        resizable: true,
        filter: true
      },
      {
        headerName: 'CARDNAME',
        field: 'CARDNAME',
        resizable: true,
        filter: true
      },
      {
        headerName: 'DAYSINARREARS',
        field: 'DAYSINARREARS',
        resizable: true,
        filter: true
      },
      {
        headerName: 'EXPPMNT',
        field: 'EXPPMNT',
        resizable: true,
      },
      {
        headerName: 'OUTSTANDING BALANCE',
        field: 'OUTBALANCE',
        resizable: true,
      },
      {
        headerName: 'LIMIT',
        field: 'LIMIT',
        resizable: true,
      },
      {
        headerName: 'CYCLE',
        field: 'CYCLE',
        resizable: true,
      },
      {
        headerName: 'COLOFFICER',
        field: 'COLOFFICER',
        resizable: true,
      }
    ];

    this.dataSource = {
      getRows: (params: IGetRowsParams) => {

        this.apiServiceSearch(this.model.searchText, 20, params.startRow).subscribe(response => {
          params.successCallback(
            response, this.searchTotal
          );
          this.gridOptions.api.hideOverlay();
        });
      }
    };

    this.gridApi.setDatasource(this.dataSource);
  }

  apiServiceSearch(searchstring, pagesize, currentPos) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(environment.api + '/api/tcards/searchall?searchstring=' + searchstring + '&pagesize=' + pagesize + '&currentposition=' + currentPos);
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
    this.columnDefs = [
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
        headerName: 'OUTSTANDING BALANCE',
        field: 'outbalance',
        resizable: true,
      },
      {
        headerName: 'LIMIT',
        field: 'limit',
        resizable: true,
      },
      {
        headerName: 'CYCLE',
        field: 'cycle',
        resizable: true,
      },
      {
        headerName: 'COLOFFICER',
        field: 'colofficer',
        resizable: true,
      }
    ];
    this.gridApi.sizeColumnsToFit();
    this.dataSource = {
      getRows: (params: IGetRowsParams) => {

        this.apiService(20, params.startRow).subscribe(response => {
          params.successCallback(
            response, this.noTotal
          );
        });
      }
    };
    this.gridApi.setDatasource(this.dataSource);
  }

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    this.ecolService.totalcreditcardsviewall().subscribe(viewall => {
      this.noTotal = viewall[0].TOTALVIEWALL;
    });
  }

  gridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource);
  }

  apiService(perPage, currentPos) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(environment.api + '/api/tcards?filter[limit]=' + perPage + '&filter[skip]=' + currentPos + '&filter[order]=outbalance desc');
  }

}

