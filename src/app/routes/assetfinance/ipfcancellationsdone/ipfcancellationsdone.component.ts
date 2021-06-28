import { Component, OnInit } from '@angular/core';
import {AllModules} from '@ag-grid-enterprise/all-modules';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-ipfcancellationsdone',
  templateUrl: './ipfcancellationsdone.component.html',
  styleUrls: ['./ipfcancellationsdone.component.scss']
})

export class IpfCancellationsDoneComponent implements OnInit {
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
      { field: 'CUSTNAME', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'CUSTNUMBER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'DAYSINARR', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'REFUNDAMOUNT', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'BROKER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'DAYSUTILIZED', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'DAYSUNUTILIZED', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
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
        field: 'SCHEDULEAMOUNT',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          } else {
            return ''
          }
        },
        filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, aggFunc: 'sum', resizable: true
      },
      { field: 'POLICYAMOUNT', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'POLICYSTARTDATE', filter: 'agDateColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'LOANSTARTDATE', filter: 'agDateColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'INSURANCECO', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'STATUS', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'PAYMENTAMOUNT', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'PAYMENTDATE', filter: 'agDateColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'CANCELLATIONDATE', filter: 'agDateColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'WRITEOFFAMOUNT', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'REINSTATEMENTDATE', filter: 'agDateColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'POLICYNUMBER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'ID', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: false }
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

        fetch(environment.nodeapi + '/tbl-ipf-cancellations/gridviewall', {
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

  onRowClicked(event: any) {
    this.model = event.node.data;
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/cancelipfupdate?id=' + this.model.ID + '&username=' + this.username + '&sys=cancelipf', '_blank');
  }


  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  }

}
