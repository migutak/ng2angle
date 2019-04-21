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
  searchText: string;
  model: any = {};
  noTotal: number;

  gridOptions: GridOptions;
  gridApi: GridApi;
  // private rowClassRules;

  columnDefs = [
    {
      headerName: 'LOANACCNUMBER',
      field: "loanaccnumber",
      cellRenderer: function (params) {
        return '<a  href="#" target="_blank">' + params.value + '</a>'
      }
    },
    {
      headerName: "CLIENTNAME",
      field: "clientname"
    },
    {
      headerName: "AMOUNTDISBURCED",
      field: "amountdisbursed"
    },
    {
      headerName: "ARREARS CATEGIRY",
      field: "arrears_category",
      cellStyle: function (params) {
        if (params.value == '90+') {
          return { color: 'red'};
        }else if (params.value == '180+') {
          return { color: 'red'};
        } else {
          return null;
        }
      }
    },
    {
      headerName: "LOAN TYPE",
      field: "loan_type"
    },
    {
      headerName: "EMPLOYER",
      field: "employer"
    },
    {
      headerName: "IDNUMBER",
      field: "idnumber"
    },
    {
      headerName: "AROCODE",
      field: "arocode"
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
    this.searchText = $event.target.value;
  }

  onSearch() {
    if (this.model.searchText == undefined) {
      return;
    }
    this.clear();
    this.http.get<any>(environment.api + '/api/mcoopcash_stage/search?searchtext=' + this.model.searchText).subscribe(resp => {
      //
      this.gridApi.updateRowData({ add: resp, addIndex: 0 });
    })
  }

  clear() {
    let dataSource = {
      getRows(params: any) {
        params.successCallback([], 0);
      }
    };
    this.gridOptions.api.setDatasource(dataSource);
  }

  reset() {
    // location.reload();
    this.clear();
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource)
  }

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    this.ecolService.totalmcoopcashviewall().subscribe(viewall => {
      this.noTotal = viewall[0].TOTALVIEWALL;
    })
  }

  gridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource);
  }


  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {

      // Use startRow and endRow for sending pagination to Backend
      // params.startRow : Start Page
      // params.endRow : End Page
      //
      this.apiService(20, params.startRow).subscribe(response => {
        params.successCallback(
          response, this.noTotal
        );
      })
    }
  }

  apiService(perPage, currentPos) {
    return this.http.get<any>(environment.api + '/api/mcoopcash_stage?filter[limit]=' + perPage + '&filter[skip]=' + currentPos)
  }

}
