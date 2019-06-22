import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-demandsdue',
  templateUrl: './demandsdue.component.html',
  styleUrls: ['./demandsdue.component.scss']
})
export class DemandsdueComponent implements OnInit {

  model: any = {};
  public radioModel: string;
  total: any = {};
  searchTotal: number;
  constructor(private ecolService: EcolService, private http: HttpClient) {
    this.gridOptions = <GridOptions>{
      headerHeight: 40,
      pagination: true,
      rowSelection: 'single',
      rowModelType: 'infinite',
      cacheBlockSize: 20,
      paginationPageSize: 20
    };
  }

  user = JSON.parse(localStorage.getItem('currentUser'));

  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;
  username: string;
  searchText: string;
  noTotal: number;

  gridOptions: GridOptions;
  gridApi: GridApi;

  columnDefs = [
    {
      headerName: 'ACCNUMBER',
      field: 'ACCNUMBER',
      cellRenderer: function (params) {
        return '<a  href="#" target="_blank">' + params.value + '</a>';
      }
    },
    {
      headerName: 'CLIENTNAME',
      field: 'CLIENT_NAME'
    },
    {
      headerName: 'OUSTBALANCE',
      field: 'oustbaOUSTBALANCElance',
      valueFormatter: this.currencyFormatter
    },
    {
      headerName: 'TOTALARREARS',
      field: 'totalarreaTOTALARREARSrs',
      valueFormatter: this.currencyFormatter
    },
    {
      headerName: 'DAYSINARR',
      field: 'DAYSINARR'
    },
    {
      headerName: 'EMAILADDRESS',
      field: 'EMAILADDRESS'
    },
    {
      headerName: 'DEMANDLETTER',
      field: 'DEMANDLETTER'
    },
    {
      headerName: 'COLOFFICER',
      field: 'COLOFFICER'
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

  onRowDoubleClicked(event: any) {
    this.model = event.node.data;
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/sendletter?accnumber=' + this.model.ACCNUMBER + '&custnumber=' + this.model.CUSTNUMBER + '&username=' + this.username + '&demand=' + this.model.DEMANDLETTER + '&id=' + this.model.id, '_blank');
  }

  onQuickFilterChanged($event) {
    // this.gridOptions.api.setQuickFilter($event.target.value);
    this.searchText = $event.target.value;
  }

  currencyFormatter(params) {
    return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  onSearch() {
    if (this.model.searchText === undefined) {
      return;
    }
    this.clear();
    this.gridApi.showLoadingOverlay();
    this.dataSource = {
      getRows: (params: IGetRowsParams) => {
        // Use startRow and endRow for sending pagination to Backend
        // params.startRow : Start Page
        // params.endRow : End Page
        //
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
    this.username = currentUser.username;

    this.ecolService.totaldemandsdue().subscribe(viewall => {
      this.noTotal = viewall[0].TOTALVIEWALL;
    });
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
    return this.http.get<any>(environment.nodeapi + '/demandsdue/all?offset=' + currentPos + '&rows=' + perPage );
  }

  apiServiceSearch(perPage, currentPos) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(environment.nodeapi + '/demandsdue/all_search?searchtext=' + this.model.searchText + '&rows=' + perPage + '&offset=' + currentPos);
  }

}
