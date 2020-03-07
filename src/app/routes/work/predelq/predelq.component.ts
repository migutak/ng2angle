import { Component, OnInit, ViewChild } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from '@ag-grid-community/all-modules';
import * as $ from 'jquery';

@Component({
  selector: 'app-predelq',
  templateUrl: './predelq.component.html',
  styleUrls: ['./predelq.component.scss']
})
export class PredelqComponent implements OnInit {

  public overlayLoadingTemplate;
  public overlayNoRowsTemplate;
  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;
  username: string;
  searchText: string;
  model: any = {};
  noTotal: number;
  gridOptions: GridOptions;

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  rowData: any = [];

  constructor(private ecolService: EcolService, private http: HttpClient) {
    this.columnDefs = [
      {
        field: 'athlete',
        width: 150,
        suppressSizeToFit: true,
        resizable: true
      },
      {
        field: 'age',
        width: 90,
        minWidth: 50,
        maxWidth: 100,
        resizable: true
      },
      {
        field: 'country',
        width: 120
      },
      {
        field: 'year',
        width: 90
      },
      {
        field: 'date',
        width: 110
      },
      {
        field: 'sport',
        width: 110
      },
      {
        field: 'gold',
        width: 100
      },
      {
        field: 'silver',
        width: 100
      },
      {
        field: 'bronze',
        width: 100
      },
      {
        field: 'total',
        width: 100
      }
    ];
    this.defaultColDef = { resizable: true };
  }


  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json'
      )
      .subscribe(data => {
        this.rowData = data;
      });
  }


  apiService(perPage, currentPos) {
    // return this.http.get<any>(environment.api + '/api/qall?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(environment.api + '/api/tqall/paged/myallocation?colofficer=' + this.username + '&limit=' + perPage + '&page=' + currentPos);
  }

  apiServiceSearch(perPage, currentPos) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(environment.api + '/api/tqall/search?searchtext=' + this.model.searchText + '&limit=' + perPage + '&page=' + currentPos);
  }

}
