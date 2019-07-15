// src/app/my-grid-application/my-grid-application.component.ts
import {Component, OnInit} from "@angular/core";
import {GridOptions} from "ag-grid-community";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent implements OnInit {

    private gridOptions: GridOptions ;
    constructor() {
        this.gridOptions = <GridOptions>{
          enableSorting: true,
          enableFilter: true,
          unSortIcon: true,
      suppressCellSelection: true,
      enableColResize: true,
      domLayout: 'autoHeight',
      rowSelection: 'single',
      context: {},
      pagination: true,
      paginationPageSize: 10,
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
      },
      onGridSizeChanged: (params) => {
        params.api.sizeColumnsToFit();
      }
        };
        this.gridOptions.columnDefs = [
          {
            headerName: 'ACCNUMBER',
            field: 'accnumber',
            // filter: "agTextColumnFilter",
            width: 90,
            // cellRenderer: function (params) {
            //   return '<a  href="#" target="_blank">' + params.value + '</a>';
            // },
            // resizable: true,
            // checkboxSelection: true
          },
          {
            headerName: 'CUSTNUMBER',
            field: 'custnumber',
            width: 90,
            // resizable: true, sortable: true, filter: true
          },
          {
            headerName: 'CUSTNAME',
            field: 'client_name',
            width: 90,
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
        this.gridOptions.rowData = [
            {accnumber: '123456', custnumber: '123490' , client_name:'random', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'pending',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
            {accnumber: '123457', custnumber: '123491' , client_name:'laptop', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'complete',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
            {accnumber: '123458', custnumber: '123492' , client_name:'machine', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'processing',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'vomwega',},
            {accnumber: '123459', custnumber: '123493' , client_name:'coopbank', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'stall',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
            {accnumber: '123450', custnumber: '123494' , client_name:'loan', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'pending',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
            {accnumber: '123451', custnumber: '123495' , client_name:'calendaer', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'complete',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'vomwega',},
            {accnumber: '123452', custnumber: '123496' , client_name:'vehicle', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'pending',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
            {accnumber: '123453', custnumber: '123497' , client_name:'jkia', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'pending',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'vomwega',},
            {accnumber: '123454', custnumber: '123498' , client_name:'raila', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'pending',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
            {accnumber: '123455', custnumber: '123499' , client_name:'uhuru', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'complete',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'vomwega',},
            {accnumber: '123440', custnumber: '123400' , client_name:'kalonzo', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'complete',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
            {accnumber: '123441', custnumber: '123401' , client_name:'wetangular', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'test',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
            {accnumber: '123442', custnumber: '123402' , client_name:'ruto', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'writeoff',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'vomwega',},
            {accnumber: '123443', custnumber: '123403' , client_name:'kimani', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'complete',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'tmasha',},
            {accnumber: '123444', custnumber: '123404' , client_name:'murkomen', daysinarr:'20', instamount:'30000', oustbalance:'12000', bucket:'writeoff',  arocode:'coop', rrocode:'test',  section:'test',  colofficer:'vomwega',},
        ]
    }
    public ngOnInit(): void {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
  
      /*this.ecolService.totaltqall().subscribe(viewall => {
        this.noTotal = viewall[0].TOTALVIEWALL;
      });*/
    }

    getSelectedRows(e){
      console.log('e')
    }
}