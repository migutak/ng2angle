import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-changerrocode',
  templateUrl: './changerrocode.component.html',
  styleUrls: ['./changerrocode.component.scss']
})
export class ChangerrocodeComponent implements OnInit {
  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowModelType;
  public cacheBlockSize;
  public maxBlocksInCache;
  public rowData: [];
  rowSelection;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  username: string;
  searchText: string;
  model: any = {};
  pivotPanelShow = true;

  modules = AllModules;

  constructor(
    private http: HttpClient,
  ) {
    this.columnDefs = [
      {
        field: 'APPLINK',
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
      { field: 'ACCNUMBER', filter: 'agTextColumnFilter', width: 200, filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'CUSTNUMBER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'CUSTNAME', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'STATUS', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'DAYSINARR', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
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
      }, {
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
      { field: 'REQUESTBY', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'REQUESTDATE', filter: 'agDateColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true }
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
    this.rowSelection = 'multiple';
  }

  onQuickFilterChanged() {
    var inputValue = (<HTMLInputElement>document.getElementById('quickFilter')).value;
    this.gridApi.setQuickFilter(inputValue);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.refreshfunc();
  }


  currencyFormatter(params) {
    if (params.value !== undefined) {
      return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
      return ''
    }
  }

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  }

  refreshData(status) {
    this.http
      .get(
        environment.nodeapi + '/tbl-relegations?filter[where][status]=' + status
      )
      .subscribe(data => {
        this.gridApi.setRowData(data)
      });
  }


  onCellClicked(event: any) {
    this.model = event.node.data;
    if (this.model.APPLINK == event.value) {
      window.open(this.model.APPLINK, '_blank');
    }
  }

  refreshfunc() {
    this.http
      .get(
        environment.nodeapi + '/api/tbl-relegations?filter[where][status]=approved awaiting change of rrocode'
      )
      .subscribe(data => {
        this.gridApi.setRowData(data)
      }, error => {
        console.log(error)
      });
  }


}
