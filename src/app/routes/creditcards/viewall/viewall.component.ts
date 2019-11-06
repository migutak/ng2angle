import {Component, OnInit} from '@angular/core';
import {GridOptions, IDatasource, IGetRowsParams, ColDef} from 'ag-grid';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})

export class ViewallComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  public overlayLoadingTemplate;
  public overlayNoRowsTemplate;

  private columnDefs;
  private defaultColDef;
  private rowModelType;
  private cacheBlockSize;
  private maxBlocksInCache;
  private rowData: [];

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  username: string;
  searchText: string;
  model: any = {};

  constructor(private http: HttpClient) {
    this.columnDefs = [

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
    this.defaultColDef = {
      width: 120,
      resizable: true,
      sortable: true,
      floatingFilter: true
    };
    this.rowModelType = "serverSide";
    this.cacheBlockSize = 50;
    this.maxBlocksInCache = 0;

    this.overlayLoadingTemplate =
      // tslint:disable-next-line:max-line-length
      '<span class="ag-overlay-loading-center" style="padding: 10px; border: 1px solid #444; background: blue;">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
      '<span style="padding: 10px; border: 1px solid #444; background: blue;">There are \'no rows\' </span>';
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource = {
      getRows(params) {
        console.log(JSON.stringify(params.request, null, 1));

        fetch(environment.nodeapi + '/gridcardsviewall/viewall', {
          method: 'post',
          body: JSON.stringify(params.request),
          headers: { "Content-Type": "application/json; charset=utf-8" }
        })
          .then(httpResponse => httpResponse.json())
          .then(response => {
            params.successCallback(response.rows, response.lastRow);
          })
          .catch(error => {
            console.error(error);
            params.failCallback();
          })
      }
    };

    params.api.setServerSideDatasource(datasource);
  }

  ServerSideDatasource(server) {
    return {
      getRows(params) {
        setTimeout(function () {
          var response = server.getResponse(params.request);
          if (response.success) {
            params.successCallback(response.rows, response.lastRow);
          } else {
            params.failCallback();
          }
        }, 500);
      }
    };
  }

  currencyFormatter(params) {
    if (params.value !== undefined) {
      return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
      return ''
    }
  }

  onRowDoubleClicked(event: any) {
    this.model = event.node.data;
    // console.log(this.model);
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/activitylog?accnumber=' + this.model.CARDACCT + '&custnumber=' + this.model.CARDACCT + '&username=' + this.username + '&sys=cc', '_blank');
  }


  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  }

}

