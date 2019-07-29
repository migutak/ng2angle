
// src/app/my-grid-application/my-grid-application.component.ts
import { Component, OnInit } from "@angular/core";
import { GridOptions, ExcelExportParams,IDatasource, IGetRowsParams, ColDef } from "ag-grid";
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EcolService } from '../../../services/ecol.service';


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

  private gridOptions: GridOptions;

  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private sortingOrder;
  private searchValue;
  model: any = {};



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
        this.gridColumnApi = params.columnApi
        
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
    
    


  }
  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));


    /*this.ecolService.totaltqall().subscribe(viewall => {
      this.noTotal = viewall[0].TOTALVIEWALL;
    });*/
  };

  onBtExport() {
    var params = {
      skipHeader: false,
        skipFooters: true,
        skipGroups: true,
        fileName: "export.csv"

    };

   this.gridApi.exportDataAsCsv(params);
  }
  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }
 
  


}