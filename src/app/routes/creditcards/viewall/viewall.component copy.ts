
// src/app/my-grid-application/my-grid-application.component.ts
import { Component, OnInit } from "@angular/core";
import { GridOptions, ExcelExportParams, IDatasource, IGetRowsParams, ColDef } from "ag-grid-community";
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EcolService } from '../../../services/ecol.service';
import { Constants } from "ag-grid-community/dist/lib/constants";


@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent {


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
  private searchValue;
  
  model: any = {};
  rowData: Object;
  defaultColDef: { sortable: boolean; filter: boolean; };



  constructor(private http: HttpClient) {

    this.gridOptions = <GridOptions>{

      unSortIcon: true,
      // suppressCellSelection: true,

      enableColResize: true,
      domLayout: 'autoHeight',
      // rowSelection: 'single',
      // rowModelType: 'normal',


      pagination: true,
      paginationPageSize: 20,

     

      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        const rowModel = (<any>this.gridApi).rowModel;
        rowModel._originalGetType = rowModel.getType;
        rowModel._fakeGetType = () => Constants.ROW_MODEL_TYPE_SERVER_SIDE;


        

        // this.gridApi.setDatasource(this.dataSource);
        this.http
          .get(environment.api + "/api/tcards")
          .subscribe(data => {
            
            params.api.setRowData(<any>data);

          })


      },
     
      onGridSizeChanged: (params) => {
        params.api.sizeColumnsToFit();
      }
      



    };

    this.gridOptions.columnDefs = [

      {
        headerName: 'CARDACCT',
        field: 'cardacct',
        cellRenderer: function (params) {
          return '<a  href="#" target="_blank">' + params.value + '</a>';
        },
        width: 90,
      },
      {
        headerName: 'CARDNUMBER',
        field: 'cardnumber',
        width: 90,

      },
      {
        headerName: 'CARDNAME',
        field: 'cardname',
        width: 90,

      },
      {
        headerName: 'DAYSINARREARS',
        field: 'daysinarrears',
        width: 90,
      },
      {
        headerName: 'EXPPMNT',
        field: 'exppmnt',
        width: 90,
      },
      {
        headerName: 'OUTSTANDING BALANCE',
        field: 'outbalance',
        width: 90,
      },
      {
        headerName: 'LIMIT',
        field: 'limit',
        width: 90,
      },
      {
        headerName: 'CYCLE',
        field: 'cycle',
        width: 90,
      },
      {
        headerName: 'COLOFFICER',
        field: 'colofficer',
        width: 90,
      },



    ];



    this.sortingOrder = ["desc", "asc"];
    this.defaultColDef = {
      sortable: true,
      filter: true
    };




  }
  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));


    /*this.ecolService.totaltqall().subscribe(viewall => {
      this.noTotal = viewall[0].TOTALVIEWALL;
    });*/
  };


  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

 
  
  onDownloadButtonClick() {

    const rowModel = (<any>this.gridApi).rowModel;
    rowModel.getType = rowModel._fakeGetType;
    this.gridApi.exportDataAsCsv({
        fileName: 'all-records'
    });
    rowModel.getType = rowModel._originalGetType;
}

}










