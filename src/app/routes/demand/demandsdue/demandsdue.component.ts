import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AllModules } from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'app-demandsdue',
  templateUrl: './demandsdue.component.html',
  styleUrls: ['./demandsdue.component.scss']
})
export class DemandsdueComponent implements OnInit {

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
  model:any;
  pivotPanelShow = true;

  modules = AllModules;

  constructor() {

    this.columnDefs = [
      {
        headerName: 'ACCNUMBER',
        field: 'ACCNUMBER',
        cellRenderer: function (params) {
          return '<a  href="#" target="_blank">' + params.value + '</a>';
        },
        filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'CLIENTNAME',
        field: 'CLIENT_NAME',
        filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'OUSTBALANCE',
        field: 'OUSTBALANCE',
        valueFormatter: this.currencyFormatter,
        filter: 'agnumberColumnFilter', filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'TOTALARREARS',
        field: 'TOTALARREARS',
        valueFormatter: this.currencyFormatter,
        filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'DAYSINARR',
        field: 'DAYSINARR',
        filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'EMAILADDRESS',
        field: 'EMAILADDRESS',
        filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'DATEDUE',
        field: 'DATEDUE',
        filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'DEMANDLETTER',
        field: 'DEMANDLETTER',
        filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'COLOFFICER',
        field: 'COLOFFICER',
        filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'STATUS',
        field: 'STATUS',
        filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' },
        resizable: true
      }
    ];

    this.defaultColDef = {
      width: 120,
      resizable: true,
      sortable: true,
      floatingFilter: true,
      unSortIcon: true,
      suppressResize: false,
      enableRowGroup: true,
      enablePivot: false,
      pivot: false
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
          fetch(environment.nodeapi + '/demandsdue/all', {
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

  onCellClicked(event: any) {
   this.model = event.node.data;
   if(this.model.ACCNUMBER == event.value) {
    // tslint:disable-next-line:max-line-length
   window.open(environment.applink + '/sendletter?accnumber=' + this.model.ACCNUMBER + '&custnumber=' + this.model.CUSTNUMBER + '&username=' + this.username + '&demand=' + this.model.DEMANDLETTER + '&id=' + this.model.ID, '_blank');
   }
  }

  onQuickFilterChanged($event) {
    // this.gridOptions.api.setQuickFilter($event.target.value);
   // this.searchText = $event.target.value;
  }

  currencyFormatter(params) {
    return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
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

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    
  }


}
