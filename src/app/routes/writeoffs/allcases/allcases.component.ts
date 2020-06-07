import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import swal from 'sweetalert2';
import { EcolService } from '../../../services/ecol.service';
import { ExportInvoiceService } from '../../../services/exportinvoices.service'

@Component({
  selector: 'app-allcases',
  templateUrl: './allcases.component.html',
  styleUrls: ['./allcases.component.scss']
})
export class AllCasesComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowModelType;
  public cacheBlockSize;
  public maxBlocksInCache;
  export: boolean = true;
  public rowData: [];
  isRowSelectable;
  rowSelection;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  username: string;
  searchText: string;
  model: any = {};
  pivotPanelShow = true;

  modules = AllModules;

  constructor(
    private http: HttpClient,
    private ecolService: EcolService,
    private exportInvoiceService: ExportInvoiceService,
  ) {
    this.columnDefs = [
      {
        field: 'accnumber',
        filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true
      },
      {
        field: 'applink',
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
      { field: 'custname', filter: 'agTextColumnFilter', width: 200, filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'rrocode', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'custnumber', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'writeoffamount', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'settlementamount', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'section', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      {
        field: 'oustbalance',
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
        field: 'provisionamount',
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
        field: 'resultantbalance',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          } else {
            return ''
          }
        },
        filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true
      },

      { field: 'arocode', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'approved', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'status', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'daterequested', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'dateapproved', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };

    this.rowSelection = 'multiple';
    this.isRowSelectable = function (rowNode) {
      return rowNode.data ? rowNode.data.status == 'print-to-finance' : false;
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.refreshfunc();
}

onQuickFilterChanged() {
  var inputValue = (<HTMLInputElement>document.getElementById('quickFilter')).value;
  this.gridApi.setQuickFilter(inputValue);
} 

  currencyFormatter(params) {
    if (params.value !== undefined) {
      return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
      return ''
    }
  }

  onCellDoubleClicked(event: any) {
    this.model = event.node.data;
    if (this.model.applink == event.value) {
      window.open(this.model.applink, '_blank');
    }
  }


  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  }

  getSelectedRows() {
    swal({
      title: 'Confirm',
      imageUrl: 'assets/img/user/coop.jpg',
      text: 'Confirm Print to Finance',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Print!'
    }).then((result) => {
      if (result.value) {
        // close tab
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        this.exportInvoiceService.generateinvoice();
        for (let i = 0; i < selectedData.length; i++) {
          const body = {
            id: 0,
            status: ''
          }
          body.id = selectedData[i].id
          body.status = 'complete';

          this.http.patch(environment.api + '/api/tbl_writeoffs', body).subscribe(resp => {
            //
          })
        }
        // refresh grid
        this.refreshfunc();
      } else {
        // reset
        //
      }
    });

  }

  refreshfunc() {
    this.http
      .get(
        environment.api + '/api/tbl_writeoffs?filter[where][status][nin]=pending-approval&filter[where][status][nin]=complete'
      )
      .subscribe(data => {
        this.gridApi.setRowData(data)
      }, error => {
        console.log(error)
      });
  }


  onRowSelected(event) {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);

    if (selectedData.length == 1) {
      this.export = false;

    } else if (selectedData.length > 1) {
      this.export = false;
    } else {
      this.export = true;
    }
  }

  refreshData(status) {
    this.http
      .get(
        environment.api + '/api/tbl_writeoffs?filter[where][status]=' + status
      )
      .subscribe(data => {
        this.gridApi.setRowData(data)
      });
  }


}
