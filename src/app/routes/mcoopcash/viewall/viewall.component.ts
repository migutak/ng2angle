
// src/app/my-grid-application/my-grid-application.component.ts
import { Component, OnInit } from "@angular/core";
import { GridOptions, ExcelExportParams,IDatasource, IGetRowsParams, ColDef } from "ag-grid-community";
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
          .get(environment.api + "/api/mcoopcash_stage")
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
        headerName: 'LOANACCNUMBER',
        field: 'loanaccnumber',
        cellRenderer: function (params) {
          return '<a  href="#" target="_blank">' + params.value + '</a>';
        }
      },
      {
        headerName: 'CLIENTNAME',
        field: 'clientname',
        filter:'agTextColumnFilter'
      },
      {
        headerName: 'AMOUNTDISBURCED',
        field: 'amountdisbursed'
      },
      {
        headerName: 'ARREARS CATEGIRY',
        field: 'arrears_category',
        cellStyle: function (params) {
          if (params.value === '90+') {
            return { color: 'red'};
          } else if (params.value === '180+') {
            return { color: 'red'};
          } else {
            return null;
          }
        }
      },
      {
        headerName: 'LOAN TYPE',
        field: 'loan_type'
      },
      {
        headerName: 'EMPLOYER',
        field: 'employer'
      },
      {
        headerName: 'IDNUMBER',
        field: 'idnumber'
      },
      {
        headerName: 'AROCODE',
        field: 'arocode'
      }
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
  onBtFirst() {
    this.gridApi.paginationGoToFirstPage();
  }

  onBtLast() {
    console.log("here");
    this.gridApi.paginationGoToLastPage();
  }

  onBtNext() {
    this.gridApi.paginationGoToNextPage();
  }

  onBtPrevious() {
    this.gridApi.paginationGoToPreviousPage();
  }
 
  


}