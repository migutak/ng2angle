import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AllModules } from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'app-relegatedfiles',
  templateUrl: './relegatedfiles.component.html',
  styleUrls: ['./relegatedfiles.component.scss']
})
export class RelegatedfilesComponent implements OnInit {
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
  pivotPanelShow = true;

  modules = AllModules;

  constructor() {
    this.columnDefs = [
      {
        field: 'ACCNUMBER',
        filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true, checkboxSelection: true,
        cellRenderer: function (params) {
          if (params.value == undefined) {
            return 'No Data Found';
          }
        }
      },
      {
        field: 'APPLINK',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return '<a  href="#" target="_blank">' + params.value + '</a>';
          } else {
            
            // return '<img src="assets/img/user/loading.gif">';
          }
        },
        filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true
      },
      { field: 'CUSTNAME', filter: 'agTextColumnFilter', width: 200, filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'RROCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'CUSTNUMBER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'WRITEOFFAMOUNT', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'SETTLEMENTAMOUNT', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },  
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
        field: 'PROVISIONAMOUNT',
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
        field: 'RESULTANTBALANCE',
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
      
      { field: 'RROCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'APPROVED', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'STATUS', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'DATEREQUESTED', filter: 'agDateColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'DATEAPPROVED', filter: 'agDateColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
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
      pivot: true
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
          fetch(environment.nodeapi + '/writeoffapprovals/all', {
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

  onCellClicked(event: any) {
    this.model = event.node.data;
    if (this.model.APPLINK == event.value) {
    window.open(this.model.APPLINK, '_blank');
    }
  }


  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  }


}
