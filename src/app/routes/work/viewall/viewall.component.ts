import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import * as moment from 'moment';
import { EcolService } from '../../../services/ecol.service'

let _EcolService: any = EcolService

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})

export class ViewallComponent implements OnInit {
  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowModelType;
  public cacheBlockSize;
  public maxBlocksInCache;
  public rowData: [];
  public sideBar;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  username: string;
  searchText: string;
  model: any = {};
  pivotPanelShow = true;

  modules = AllModules;


  constructor() {
    this.columnDefs = [
      {
        field: 'ACCNUMBER',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return '<a  href="#" target="_blank">' + params.value + '</a>';
          } else {
            return 'No Data Found';
            // return '<img src="assets/img/user/loading.gif">';
          }
        },
        filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true
      },
      { field: 'CLIENT_NAME', filter: 'agTextColumnFilter', width: 200, filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'DAYSINARR', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'CUSTNUMBER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'BUCKET', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'PRODUCTCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'SECTION', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
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
        field: 'PRINCARREARS',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          } else {
            return ''
          }
        },
        filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true
      },
      {
        field: 'INSTAMOUNT',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          } else {
            return ''
          }
        },
        filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true
      },
      { field: 'LIMITAMOUNT', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      {
        field: 'TOTALARREARS',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          } else {
            return ''
          }
        },
        filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }
      },
      { field: 'RROCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'AROCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'BRANCHCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'BRANCHNAME', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'COLOFFICER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'DEPTCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'EMPLOYERNAME', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
    ];
    this.defaultColDef = {
      width: 120,
      resizable: true,
      sortable: true,
      floatingFilter: true,
      unSortIcon: true,
      suppressResize: false,
      enableRowGroup: true,
      enablePivot: true,
      pivot: true,
      flex: 1,
      enableValue: true,
      filter: true,
    };
    this.rowModelType = "serverSide";
    this.cacheBlockSize = 50;
    this.maxBlocksInCache = 0;
    this.sideBar = 'columns';
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource = {
      getRows(params) {
        var response_body: any;
        var _httpResponse: any;
        //console.log(JSON.stringify(params.request, null, 1));
        const started = Date.now();
        const started_datetime = moment().format();
        fetch(environment.nodeapi + '/tqall/gridviewall', {
          method: 'post',
          body: JSON.stringify(params.request),
          headers: { "Content-Type": "application/json; charset=utf-8" }
        })
          .then(httpResponse =>
            _httpResponse = httpResponse
          )
          .then(httpResponse =>
            httpResponse.json()
          )
          .then(response => {
            params.successCallback(response.rows, response.lastRow);
            response_body = response;
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
            const date = moment().format();
            const esmsg = {
              "datetime": date,
              "endpoint_url": _httpResponse.url,
              "method": 'POST',
              "request_body": params.request,
              //"response_body": response_body,
              "start_time": started_datetime,
              "end_time": end_datetime,
              "time_elapsed(ms)": elapsed,
              "status_code": _httpResponse.status,
              "status_text": _httpResponse.statusText,
              "user": JSON.parse(localStorage.getItem('currentUser')).USERNAME,
              "client_ip": 'xx.xx.xx.xx',
              "message": _httpResponse.message,
              "ok": _httpResponse.ok
            }
            fetch(`${environment.elasticsearch}/ecollectclientapp/_doc`, {
              method: 'post',
              body: JSON.stringify(esmsg),
              headers: { "Content-Type": "application/json; charset=utf-8" }
            }).catch(error => {
              console.error(error);
            })
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

  onCellClicked(event: any) {
    this.model = event.node.data;
    if (this.model.ACCNUMBER == event.value) {
      // tslint:disable-next-line:max-line-length
      window.open(environment.applink + '/activitylog?accnumber=' + this.model.ACCNUMBER + '&custnumber=' + this.model.CUSTNUMBER + '&username=' + this.currentUser.USERNAME + '&sys=collections&nationid=' + this.model.NATIONID, '_blank');
    }
  }
  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  }

}

