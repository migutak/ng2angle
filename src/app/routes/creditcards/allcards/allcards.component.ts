import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as $ from 'jquery';
import { EcolService } from '../../../services/ecol.service';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-allcards',
  templateUrl: './allcards.component.html',
  styleUrls: ['./allcards.component.scss']
})
export class AllcardsComponent implements OnInit {

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
      headerName: 'DATEDISBURSED',
      field: 'DATEDISBURSED',
      resizable: true,
      filter: true
    },
    {
      headerName: 'LIMIT',
      field: 'LIMIT',
      resizable: true,
      filter: true
    },
    {
      headerName: 'EXPPMNT',
      field: 'EXPPMNT',
      resizable: true,
    },
    {
      headerName: 'OUTBALANCE',
      field: 'OUTBALANCE',
      resizable: true,
    },
    {
      headerName: 'CYCLE',
      field: 'CYCLE',
      resizable: true,
    }
  ];
  rowData1: any;

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.apiService(20, params.startRow).subscribe(response => {
        console.log(response);
        params.successCallback(
          response.data, response.totalRecords
        );
      });
    }
  };

  onRowDoubleClicked(event: any) {
    this.model = event.node.data;
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/activitylog?accnumber=' + this.model.CARDACCT + '&custnumber=' + this.model.CARDACCT + '&username=' + this.username + '&sys=watchcc', '_blank');
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

    this.dataSource = {
      getRows: (params: IGetRowsParams) => {
        this.searchService(this.model.searchText, 20, params.startRow).subscribe(searchdata => {
          params.successCallback(
            searchdata.data, searchdata.totalRecords
          );
        });
      }
    };

    this.gridApi.setDatasource(this.dataSource);

  }

  searchService(searchstring, pagesize, currentPos) {
    // tslint:disable-next-line:max-line-length
    // return this.http.get<any>(environment.api + '/api/cards_watch_stage/searchcardswatch?searchstring=' + searchstring + '&pagesize=' + pagesize + '&currentposition=' + currentPos);
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(environment.nodeapi + '/cards_watch_stage/searchall?searchstring=' + searchstring + '&rows=' + pagesize + '&offset=' + currentPos);

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
          this.gridOptions.api.hideOverlay();
        });
      }
    };
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource);
  }

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;
  }

  gridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource);
  }

  apiService(perPage, currentPos) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(environment.nodeapi + '/cards_watch_stage/all?rows=' + perPage + '&offset=' + currentPos);
  }

}

