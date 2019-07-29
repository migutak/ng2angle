import {Component, OnInit} from '@angular/core';
import {GridOptions, IDatasource, IGetRowsParams, ColDef} from 'ag-grid';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EcolService } from '../../../services/ecol.service';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent implements OnInit {

  // dataSource: IDatasource = {
  //   getRows: (params: IGetRowsParams) => {
  //     this.apiService().subscribe(data => {

  //       params.successCallback(data, 1000
  //       );
  //     })
  //   }
  // }

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
        .get(environment.nodeapi + '/tcards/raw')
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
            headerName: 'CARDACCT',
            field: 'CARDACCT',
            cellRenderer: function (params) {
              return '<a  href="#" target="_blank">' + params.value + '</a>';
            },
            width: 90,
          },
          {
            headerName: 'CARDNUMBER',
            field: 'CARDNUMBER',
            width: 90,
          },
          {
            headerName: 'CARDNAME',
            field: 'CARDNAME',
            width: 90,
          },
          {
            headerName: 'DAYSINARREARS',
            field: 'DAYSINARREARS',
            width: 90,
          },
          {
            headerName: 'EXPPMNT',
            field: 'EXPPMNT',
            width: 90,
          },
          {
            headerName: 'OUTSTANDING BALANCE',
            field: 'OUTBALANCE',
            width: 90,
          },
          {
            headerName: 'LIMIT',
            field: 'LIMIT',
            width: 90,
          },
          {
            headerName: 'CYCLE',
            field: 'CYCLE',
            width: 90,
          },
          {
            headerName: 'COLOFFICER',
            field: 'COLOFFICER',
            width: 90,
          },

        ];
        this.sortingOrder = ['desc', 'asc', null ];
    }

    dataSource: IDatasource = {
      getRows: (params: IGetRowsParams) => {
        // Use startRow and endRow for sending pagination to Backend
        // params.startRow : Start Page
        // params.endRow : End Page
        //
        this.apiService(20, params.startRow).subscribe(response => {
          params.successCallback(
            response.data, response.totalRecords
          );
        });
      }
    };
    public ngOnInit(): void {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.username = currentUser.username;
    }

    onRowDoubleClicked(event: any) {
      this.model = event.node.data;
      // console.log(this.model);
      // tslint:disable-next-line:max-line-length
      window.open(environment.applink + '/activitylog?accnumber=' + this.model.CARDACCT + '&custnumber=' + this.model.CARDACCT + '&username=' + this.username + '&sys=cc', '_blank');
    }

    /*onSearch() {
      if (this.model.searchText === undefined) {
        return;
      }
      this.clear();
      this.gridApi.showLoadingOverlay();
      this.dataSource = {
        getRows: (params: IGetRowsParams) => {
          this.apiServiceSearch(20, params.startRow).subscribe(response => {
            params.successCallback(
              response.data, response.totalRecords
            );
            this.gridOptions.api.hideOverlay();
          });
        }
      };

      this.gridApi.setDatasource(this.dataSource);
    }*/

    clear() {
      const ds = {
        getRows(params: any) {
          params.successCallback([], 0);
        }
      };
      this.gridOptions.api.setDatasource(ds);
    }

    reset() {
      this.gridApi.showLoadingOverlay();
      this.clear();
      this.dataSource = {
        getRows: (params: IGetRowsParams) => {
          // Use startRow and endRow for sending pagination to Backend
          // params.startRow : Start Page
          // params.endRow : End Page
          //
          this.apiService(20, params.startRow).subscribe(response => {
            params.successCallback(
              response.data, response.totalRecords
            );
            this.gridOptions.api.hideOverlay();
          });
        }
      };
      this.gridApi.sizeColumnsToFit();
      this.gridApi.setDatasource(this.dataSource);
    }

    apiService(perPage, currentPos) {
      // tslint:disable-next-line:max-line-length
      return this.http.get<any>(environment.nodeapi + '/tcards/all?rows=' + perPage + '&offset=' + currentPos);
    }

    getSelectedRows(event) {
      //
    }

    quickSearch() {
      this.gridApi.setQuickFilter(this.searchValue);
    }

}
