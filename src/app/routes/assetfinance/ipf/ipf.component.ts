import { Component, OnInit } from '@angular/core';
import {AllModules} from '@ag-grid-enterprise/all-modules';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-ipf',
  templateUrl: './ipf.component.html',
  styleUrls: ['./ipf.component.scss']
})

export class IpfComponent implements OnInit {
  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowModelType;
  public cacheBlockSize;
  public maxBlocksInCache;
  public rowData: [];

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  username: string;
  searchText: string;
  model: any = {};

  modules = AllModules;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        field: 'ACCNUMBER',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return '<a  href="#" target="_blank">' + params.value + '</a>';
          } else {
            return '<img src="assets/img/user/loading.gif">';
          }
        },
        filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true
      },
      { field: 'CLIENTNAME', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'CUSTNUMBER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'DAYSINARR', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'PRODUCTCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'AROCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'RROCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      {
        field: 'OUSTBALANCE',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          } else {
            return ''
          }
        },
        filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, aggFunc: 'sum', resizable: true
      },
      {
        field: 'INSTALMENTAMOUNT',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          } else {
            return ''
          }
        },
        filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, aggFunc: 'sum', resizable: true
      },
      { field: 'ORIGDATE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true }
    ];
    this.defaultColDef = {
      width: 120,
      resizable: true,
      sortable: true,
      floatingFilter: true
    };
    this.rowModelType = "serverSide";
    this.cacheBlockSize = 50;
    this.maxBlocksInCache = 0;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource = {
      getRows(params) {

        fetch(environment.api + '/api/ipf/gridviewall', {
          method: 'post',
          body: JSON.stringify(params.request),
          headers: { "Content-Type": "application/json; charset=utf-8" }
        })
          .then(httpResponse => httpResponse.json())
          .then(response => {
            params.successCallback(response.rows, response.lastRow);
          })
          .catch(error => {
            console.error(error);
            params.failCallback();
          })
      }
    };

    params.api.setServerSideDatasource(datasource);
  }

  ServerSideDatasource(server) {
    return {
      getRows(params) {
        setTimeout(function () {
          var response = server.getResponse(params.request);
          if (response.success) {
            params.successCallback(response.rows, response.lastRow);
          } else {
            params.failCallback();
          }
        }, 500);
      }
    };
  }

  currencyFormatter(params) {
    if (params.value !== undefined) {
      return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
      return ''
    }
  }

  onRowDoubleClicked(event: any) {
    this.model = event.node.data;
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/activitylog?accnumber=' + this.model.ACCNUMBER + '&custnumber=' + this.model.CUSTNUMBER + '&username=' + this.username + '&sys=assetf', '_blank');
  }


  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  }

}
