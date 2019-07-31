import {Component, OnInit} from '@angular/core';
import {GridOptions, IDatasource, IGetRowsParams, ColDef} from 'ag-grid';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EcolService } from '../../../services/ecol.service';
@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent implements OnInit {

  public gridOptions: GridOptions;

  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public sortingOrder;
    model: any = {};
    username: string;
    public searchValue;

    constructor(public http: HttpClient) {
        this.gridOptions = <GridOptions>{

          unSortIcon: true,
      // suppressCellSelection: true,

      enableColResize: true,
      domLayout: 'autoHeight',
      rowSelection: 'single',
      rowModelType: 'normal',
      // rowModelType: 'infinite',

      pagination: true,
      paginationPageSize: 20,
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        // this.gridApi.setDatasource(this.dataSource);
        this.http
        .get(environment.nodeapi + '/mcoopcash_stage/raw')
        .subscribe(resp => {
          params.api.setRowData(<any> resp);
        });

      },
      onGridSizeChanged: (params) => {
        params.api.sizeColumnsToFit();
      }
        };
        this.gridOptions.columnDefs = [
          {
            headerName: 'LOANACCNUMBER',
            field: 'LOANACCNUMBER',
            cellRenderer: function (params) {
              return '<a  href="#" target="_blank">' + params.value + '</a>';
            }
          },
          {
            headerName: 'CLIENTNAME',
            field: 'CLIENTNAME'
          },
          {
            headerName: 'AMOUNTDISBURCED',
            field: 'AMOUNTDISBURCED'
          },
          {
            headerName: 'ARREARS CATEGORY',
            field: 'ARREARS_CATEGORY'
          },
          {
            headerName: 'LOAN TYPE',
            field: 'LOAN_TYPE'
          },
          {
            headerName: 'EMPLOYER',
            field: 'EMPLOYER'
          },
          {
            headerName: 'IDNUMBER',
            field: 'IDNUMBER'
          },
          {
            headerName: 'AROCODE',
            field: 'AROCODE'
          }
        ];
        this.sortingOrder = ['desc', 'asc', null ];
    }

    public ngOnInit(): void {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.username = currentUser.username;
    }

    onRowDoubleClicked(event: any) {
      this.model = event.node.data;
      // tslint:disable-next-line:max-line-length
      window.open(environment.applink + '/activitylog?accnumber=' + this.model.LOANACCNUMBER + '&custnumber=' + this.model.LOANACCNUMBER + '&username=' + this.username + '&sys=mcoopcash', '_blank');
    }
    getSelectedRows(event) {
      //
    }

    quickSearch() {
      this.gridApi.setQuickFilter(this.searchValue);
    }

}
