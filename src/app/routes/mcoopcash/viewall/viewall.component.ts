import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as $ from 'jquery';
import { EcolService } from '../../../services/ecol.service';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('currentUser'));

  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;
  username: string;
  model:any = {};

  gridOptions: GridOptions;
  gridApi: GridApi;
  columnDefs = [
    {
      headerName: "loanaccnumber",
      field: "loanaccnumber",
      cellRenderer: function(params) {
        return '<a  href="#" target="_blank">'+ params.value+'</a>'
     }
    },
    {
      headerName: "clientname",
      field: "clientname"
    },
    {
      headerName: "amountdisbursed",
      field: "amountdisbursed"
    },
    {
      headerName: "arrears_category",
      field: "arrears_category"
    },
    {
      headerName: "loan_type",
      field: "loan_type"
    },
    {
      headerName: "employer",
      field: "employer"
    }
  ];
  rowData1: any;
  constructor(private ecolService: EcolService, private http: HttpClient) {
    this.gridOptions = <GridOptions>{
      headerHeight: 40,
      pagination: true,
      rowSelection: 'single',
      rowModelType: 'infinite',
      cacheBlockSize: 20,
      paginationPageSize: 20
    };
  }

  onRowDoubleClicked(event: any) { 
    this.model = event.node.data;
    // console.log(this.model);
    window.open(environment.applink + '/activitylog?accnumber=' + this.model.loanaccnumber + '&custnumber=' + this.model.loanaccnumber + '&username=' + this.username + '&sys=mcoopcash', '_blank');
  };

  onQuickFilterChanged($event) {
    // this.gridOptions.api.setQuickFilter($event.target.value);
    console.log($event.target.value);
  }

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;
  }

  gridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource)
  }
  

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {

      // Use startRow and endRow for sending pagination to Backend
      // params.startRow : Start Page
      // params.endRow : End Page

      console.log('params', params);
      //
      this.apiService(20, params.startRow).subscribe(response => {
        console.log(response);
        params.successCallback(
          response, 500
        );
      })
    }
  }

  apiService(perPage, currentPos) {
    return this.http.get<any>(environment.api + '/api/mcoopcash_stage?filter[limit]='+perPage+'&filter[skip]='+currentPos)
  }

}
