import {Component, OnInit} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import * as moment from 'moment';

@Component({
  selector: 'app-allecredit',
  templateUrl: './allecredit.component.html',
  styleUrls: ['./allecredit.component.scss']
})

export class AllecreditComponent implements OnInit {
  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowModelType;
  public cacheBlockSize;
  public maxBlocksInCache;
  public rowData: [];
  modules = AllModules;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  username: string;
  searchText: string;
  model: any = {};

  constructor() {
    this.columnDefs = [
      {
        field: 'LOANACCNUMBER',
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
      { field: 'IDNUMBER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'ARREARS_CATEGORY', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'LOAN_TYPE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'AROCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'DISBURSALDATE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      {
        field: 'AMOUNTDISBURSED',
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
        field: 'REPAYMENTAMOUNT',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          } else {
            return ''
          }
        },
        filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, aggFunc: 'sum', resizable: true
      },
      { field: 'EMPLOYER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'LASTPAYMENTDATE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'DUEDATE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'LOANSTATUS', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'ADDRESS', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'PHONENUMBER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
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
        //console.log(JSON.stringify(params.request, null, 1));
        var response_body: any;
        var _httpResponse: any;
        const started = Date.now();
        const started_datetime = moment().format();
        fetch(environment.api + '/api/mcoopcash_stage/gridviewall', {
          method: 'post',
          body: JSON.stringify(params.request),
          headers: { "Content-Type": "application/json; charset=utf-8" }
        })
        .then(httpResponse =>
          _httpResponse = httpResponse
        )
          .then(httpResponse => httpResponse.json())
          .then(response => {
            params.successCallback(response.rows, response.lastRow);
          })
          .catch(error => {
            console.error(error);
            params.failCallback();
          })
          .finally(() => {
            const now = Date.now();
            const end_datetime = moment().format();
            const elapsed = now - started;
            if(!_httpResponse) {
              _httpResponse = {
                url: environment.nodeapi + '/tqall/gridviewall',
                status: 102,
                statusText: 'net::ERR_CONNECTION_REFUSED',
                message: 'Failed to fetch',
                ok: false
              }
            }
            const esmsg = {
              "endpoint_url": _httpResponse.url,
              "method": 'POST',
              "request_body": params.request,
              "response_body": response_body,
              "starttime": started_datetime,
              "endtime": end_datetime,
              "elapsed": elapsed,
              "status": _httpResponse.status,
              "statusText": _httpResponse.statusText,
              "message": _httpResponse.message,
              "ok": _httpResponse.ok
            }
            this.EcolService.eslogging(esmsg);
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
    window.open(environment.applink + '/activitylog?accnumber=' + this.model.LOANACCNUMBER + '&custnumber=' + this.model.LOANACCNUMBER + '&username=' + this.username + '&sys=mcoopcash', '_blank');
  }


  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  }

}

