// src/app/my-grid-application/my-grid-application.component.ts
import {Component, OnInit} from "@angular/core";
import {GridOptions, IDatasource, IGetRowsParams, ColDef} from "ag-grid-community";
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'ag-grid-enterprise/chartsModule';
import { EcolService } from '../../../services/ecol.service';

// import "ag-grid-enterprise";

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

    public gridApi;
    public  gridColumnApi;
    public  columnDefs;
    public  sortingOrder;
  

  
    constructor(private http: HttpClient) {
        this.gridOptions = <GridOptions>{
          
          unSortIcon: true,
          enableCharts: true,
          enableRangeSelection: true,

      enableColResize: true,
      domLayout: 'autoHeight',
      // rowSelection: 'multiple',
      
      // rowModelType: 'normal',
      
      
      pagination: true,
      paginationPageSize: 20,
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
        this.gridApi = params.api;
        this.gridColumnApi= params.columnApi
        // this.gridApi.setDatasource(this.dataSource);
        this.http
        .get(environment.api + "/api/tqall")
        .subscribe(data=>{
          params.api.setRowData(<any> data);
        })
      

      },
      onGridSizeChanged: (params) => {
        params.api.sizeColumnsToFit();
      }
     
     
        };
        
        this.gridOptions.columnDefs = [
          {
            headerName: 'ACCNUMBER',
            field: 'accnumber',
            
            width: 90,
            cellRenderer: function (params) {
              return '<a  href="#" target="_blank">' + params.value + '</a>';
            },
            // resizable: true,
            // checkboxSelection: true
          },
          {
            headerName: 'CUSTNUMBER',
            field: 'custnumber',
            width: 90,
            filter: 'agTextColumnFilter'
            // resizable: true, sortable: true, filter: true
          },
          {
            headerName: 'CUSTNAME',
            field: 'client_name',
            width: 90,
            
            filter: 'agTextColumnFilter',
            sortingOrder: ["asc","desc"]
            // width: 450,
            // resizable: true
          },
          {
            headerName: 'DAYSINARREARS',
            field: 'daysinarr',
            width: 90,
            cellStyle: function (params) {
              if (params.value < '30') {
                return { color: 'red' };
              } else if (params.value > '90') {
                return { color: 'red' };
              } else {
                return null;
              }
            },
            // resizable: true
          },
          {
            headerName: 'TOTALARREARS',
            field: 'instamount',
            width: 90,
            // resizable: true,
            // valueFormatter: this.currencyFormatter
          },
          {
            headerName: 'OUSTBALANCE',
            field: 'oustbalance',
            width: 90,
            // valueFormatter: this.currencyFormatter
            // resizable: true
          },
          {
            headerName: 'BUCKET',
            field: 'bucket',
            width: 90,
            // resizable: true
          },
          {
            headerName: 'AROCODE',
            field: 'arocode',
            width: 90,
            // resizable: true
          },
          {
            headerName: 'RROCODE',
            field: 'rrocode',
            width: 90,
            // resizable: true,
            // filter: true
          },
          {
            headerName: 'SECTION',
            field: 'section',
            width: 90,
          },
          {
            headerName: 'COLOFFICER',
            field: 'colofficer',
            width: 90,
          },
          
        ];
        
        
        this.sortingOrder=["desc", "asc", null ];
        
        // this.gridOptions.rowData = [
        //     {accnumber: '123456', custnumber: '123490' , client_name:'random', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'pending',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
        //     {accnumber: '123457', custnumber: '123491' , client_name:'laptop', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'complete',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
        //     {accnumber: '123458', custnumber: '123492' , client_name:'machine', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'processing',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'vomwega',},
        //     {accnumber: '123459', custnumber: '123493' , client_name:'coopbank', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'stall',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
        //     {accnumber: '123450', custnumber: '123494' , client_name:'loan', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'pending',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
        //     {accnumber: '123451', custnumber: '123495' , client_name:'calendaer', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'complete',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'vomwega',},
        //     {accnumber: '123452', custnumber: '123496' , client_name:'vehicle', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'pending',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
        //     {accnumber: '123453', custnumber: '123497' , client_name:'jkia', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'pending',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'vomwega',},
        //     {accnumber: '123454', custnumber: '123498' , client_name:'raila', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'pending',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
        //     {accnumber: '123455', custnumber: '123499' , client_name:'uhuru', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'complete',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'vomwega',},
        //     {accnumber: '123440', custnumber: '123400' , client_name:'kalonzo', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'complete',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
        //     {accnumber: '123441', custnumber: '123401' , client_name:'wetangular', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'test',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
        //     {accnumber: '123442', custnumber: '123402' , client_name:'ruto', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'writeoff',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'vomwega',},
        //     {accnumber: '123443', custnumber: '123403' , client_name:'kimani', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'complete',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
        //     {accnumber: '123444', custnumber: '123404' , client_name:'murkomen', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'writeoff',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'vomwega',},
        // ]
    }
    public ngOnInit(): void {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
  
      /*this.ecolService.totaltqall().subscribe(viewall => {
        this.noTotal = viewall[0].TOTALVIEWALL;
      });*/
    }

    // getSelectedRows(e){
    //   console.log('e')
    // }

//     apiService(): any {
     
//       return this.http.get<any>(environment.api + '/api/tqall');

// }
}