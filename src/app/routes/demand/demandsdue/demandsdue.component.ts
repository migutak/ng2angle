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
  total:  any = {};
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
      field: 'accnumber',
      cellRenderer: function (params) {
        return '<a  href="#" target="_blank">' + params.value + '</a>';
      }
    },
    {
      headerName: 'CLIENTNAME',
      field: 'client_name'
    },
    {
      headerName: 'OUSTBALANCE',
      field: 'oustbalance',
      valueFormatter: this.currencyFormatter
    },
    {
      headerName: 'DAYSINARR',
      field: 'daysinarr',
      cellStyle: function (params) {
        if (params.value < '30') {
          return { color: 'blue'};
        } else if (params.value > '60') {
          return { color: 'red'};
        } else {
          return null;
        }
      }
    },
    {
      headerName: 'TOTALARREARS',
      field: 'totalarrears',
      valueFormatter: this.currencyFormatter
    },
    {
      headerName: 'ADDRESS',
      field: 'address'
    },
    {
      headerName: 'PRODUCT',
      field: 'section'
    },
    {
      headerName: 'COLOFFICER',
      field: 'colofficer'
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
    // window.open(environment.applink + '/activitylog?accnumber=' + this.model.loanaccnumber + '&custnumber=' + this.model.loanaccnumber + '&username=' + this.username + '&sys=mcoopcash', '_blank');
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/sendletter?accnumber=' + this.model.accnumber + '&custnumber=' + this.model.custnumber + '&username=' + this.username, '_blank');
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
    this.http.get<any>(environment.api + '/api/demandsdue/search?searchtext=' + this.model.searchText).subscribe(resp => {
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
    this.username = currentUser.username;

    this.ecolService.totaldemandsdue().subscribe(viewall => {
      this.noTotal = viewall[0].TOTALVIEWALL;
    });
  }

  gridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource);
  }

  apiService(perPage, currentPos) {
    return this.http.get<any>(environment.api + '/api/demandsdue?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
  }


  refreshgrid() {
    //
  }

}
