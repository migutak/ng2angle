import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import * as $ from 'jquery';
import { EcolService } from '../../../../services/ecol.service';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from '@ag-grid-community/all-modules';

@Component({
  selector: 'app-demandsdue',
  templateUrl: './demandsdue.component.html',
  styleUrls: ['./demandsdue.component.scss']
})


export class DemandsdueComponent implements OnInit {

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
      headerName: 'CARDACCT',
      field: 'cardacct',
      cellRenderer: function (params) {
        return '<a  href="#" target="_blank">' + params.value + '</a>';
      }
    },
    {
      headerName: 'CARDNUMBER',
      field: 'cardnumber'
    },
    {
      headerName: 'CARDNAME',
      field: 'cardname'
    },
    {
      headerName: 'DAYSINARREARS',
      field: 'daysinarrears'
    },
    {
      headerName: 'EXPPMNT',
      field: 'exppmnt',
      valueFormatter: this.currencyFormatter
    },
    {
      headerName: 'OUTBALANCE',
      field: 'outbalance',
      valueFormatter: this.currencyFormatter
    },
    {
      headerName: 'DEMANDLETTER',
      field: 'demandletter'
    },
    {
      headerName: 'CYCLE',
      field: 'cycle'
    },
    {
      headerName: 'STATUS',
      field: 'status'
    },
    {
      headerName: 'COLOFFICER',
      field: 'colofficer'
    }
  ];
  rowData1: any;

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.apiService(20, params.startRow).subscribe(response => {
        params.successCallback(
          response, this.noTotal
        );
      });
    }
  };

currencyFormatter(params) {
    return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

formatNumber(number) {
    // this puts commas into the number eg 1000 goes to 1,000,
    // i pulled this from stack overflow, i have no idea how it works
    return Math.floor(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

  onRowDoubleClicked(event: any) {
    this.model = event.node.data;
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/sendlettercc?cardacct=' + this.model.cardacct + '&username=' + this.username + '&demand=' + this.model.demandletter + '&id=' + this.model.id, '_blank');
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
    this.http.get<any>(environment.api + '/api/demandsduecc/search?searchtext=' + this.model.searchText).subscribe(resp => {
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

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.ecolService.totalcardsdue().subscribe(cards => {
      this.noTotal = cards[0].TOTALVIEWALL;
    });
  }

  gridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource);
  }

  apiService(perPage, currentPos) {
    return this.http.get<any>(environment.api + '/api/demandsduecc?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
  }

}


