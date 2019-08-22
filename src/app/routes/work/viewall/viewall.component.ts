
import { Component, OnInit, ViewChild } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import { JqxDomService } from '../../../shared/jqwidgets-dom.service';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';
import * as $ from 'jquery';
import 'ag-grid-enterprise';
import 'ag-grid-enterprise/chartsModule';


@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})

export class ViewallComponent {
    private gridApi;
    private gridColumnApi;
  
    private columnDefs;
    private components;
    private defaultColDef;
    private rowSelection;
    private rowModelType;
    private paginationPageSize;
    private cacheOverflowSize;
    private maxConcurrentDatasourceRequests;
    private infiniteInitialRowCount;
    private maxBlocksInCache;
    private getRowNodeId;
    private rowData: [];
  sortingOrder: string[];
  
    constructor(private http: HttpClient) {
      this.columnDefs = [
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
      this.components = {
        loadingRenderer: function(params) {
          if (params.value !== undefined) {
            return params.value;
          } else {
            return '<img src="../assets/img/user/loader.gif">';
          }
        }
      };
      this.defaultColDef = {
        sortable: true,
        resizable: true,
        // enableCharts: true,
        // enableRangeSelection: true
      };
      this.rowSelection = "multiple";
      this.rowModelType = "infinite";
      this.sortingOrder=["desc", "asc", null ];
      // this.paginationPageSize = 100;
      this.cacheOverflowSize = 100;
      this.maxConcurrentDatasourceRequests = 2;
      this.infiniteInitialRowCount = 100;
      this.maxBlocksInCache = 10;
      this.getRowNodeId = function(item) {
        return item.id;
      };
    }
  
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
  
      this.http
        .get<any>(environment.api + "/api/tqall")
        .subscribe(data => {
          data.forEach(function(data, index) {
            data.id = "R" + (index + 1);
          });
          var dataSource = {
            rowCount: null,
            getRows: function(params) {
              console.log("asking for " + params.startRow + " to " + params.endRow);
              setTimeout(function() {
                var dataAfterSortingAndFiltering = sortAndFilter(data, params.sortModel, params.filterModel);
                var rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
                var lastRow = -1;
                if (dataAfterSortingAndFiltering.length <= params.endRow) {
                  lastRow = dataAfterSortingAndFiltering.length;
                }
                params.successCallback(rowsThisPage, lastRow);
              }, 500);
            }
          };
          params.api.setDatasource(dataSource);
        });
    }
  }
  
  function countries() {
    return [
      "United States",
      "Russia",
      "Australia",
      "Canada",
      "Norway",
      "China",
      "Zimbabwe",
      "Netherlands",
      "South Korea",
      "Croatia",
      "France",
      "Japan",
      "Hungary",
      "Germany",
      "Poland",
      "South Africa",
      "Sweden",
      "Ukraine",
      "Italy",
      "Czech Republic",
      "Austria",
      "Finland",
      "Romania",
      "Great Britain",
      "Jamaica",
      "Singapore",
      "Belarus",
      "Chile",
      "Spain",
      "Tunisia",
      "Brazil",
      "Slovakia",
      "Costa Rica",
      "Bulgaria",
      "Switzerland",
      "New Zealand",
      "Estonia",
      "Kenya",
      "Ethiopia",
      "Trinidad and Tobago",
      "Turkey",
      "Morocco",
      "Bahamas",
      "Slovenia",
      "Armenia",
      "Azerbaijan",
      "India",
      "Puerto Rico",
      "Egypt",
      "Kazakhstan",
      "Iran",
      "Georgia",
      "Lithuania",
      "Cuba",
      "Colombia",
      "Mongolia",
      "Uzbekistan",
      "North Korea",
      "Tajikistan",
      "Kyrgyzstan",
      "Greece",
      "Macedonia",
      "Moldova",
      "Chinese Taipei",
      "Indonesia",
      "Thailand",
      "Vietnam",
      "Latvia",
      "Venezuela",
      "Mexico",
      "Nigeria",
      "Qatar",
      "Serbia",
      "Serbia and Montenegro",
      "Hong Kong",
      "Denmark",
      "Portugal",
      "Argentina",
      "Afghanistan",
      "Gabon",
      "Dominican Republic",
      "Belgium",
      "Kuwait",
      "United Arab Emirates",
      "Cyprus",
      "Israel",
      "Algeria",
      "Montenegro",
      "Iceland",
      "Paraguay",
      "Cameroon",
      "Saudi Arabia",
      "Ireland",
      "Malaysia",
      "Uruguay",
      "Togo",
      "Mauritius",
      "Syria",
      "Botswana",
      "Guatemala",
      "Bahrain",
      "Grenada",
      "Uganda",
      "Sudan",
      "Ecuador",
      "Panama",
      "Eritrea",
      "Sri Lanka",
      "Mozambique",
      "Barbados"
    ];
  }
  function sortAndFilter(allOfTheData, sortModel, filterModel) {
    return sortData(sortModel, filterData(filterModel, allOfTheData));
  }
  function sortData(sortModel, data) {
    var sortPresent = sortModel && sortModel.length > 0;
    if (!sortPresent) {
      return data;
    }
    var resultOfSort = data.slice();
    resultOfSort.sort(function(a, b) {
      for (var k = 0; k < sortModel.length; k++) {
        var sortColModel = sortModel[k];
        var valueA = a[sortColModel.colId];
        var valueB = b[sortColModel.colId];
        if (valueA == valueB) {
          continue;
        }
        var sortDirection = sortColModel.sort === "asc" ? 1 : -1;
        if (valueA > valueB) {
          return sortDirection;
        } else {
          return sortDirection * -1;
        }
      }
      return 0;
    });
    return resultOfSort;
  }
  function filterData(filterModel, data) {
    var filterPresent = filterModel && Object.keys(filterModel).length > 0;
    if (!filterPresent) {
      return data;
    }
    var resultOfFilter = [];
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      if (filterModel.age) {
        var age = item.age;
        var allowedAge = parseInt(filterModel.age.filter);
        if (filterModel.age.type == "equals") {
          if (age !== allowedAge) {
            continue;
          }
        } else if (filterModel.age.type == "lessThan") {
          if (age >= allowedAge) {
            continue;
          }
        } else {
          if (age <= allowedAge) {
            continue;
          }
        }
      }
      if (filterModel.year) {
        if (filterModel.year.values.indexOf(item.year.toString()) < 0) {
          continue;
        }
      }
      if (filterModel.country) {
        if (filterModel.country.values.indexOf(item.country) < 0) {
          continue;
        }
      }
      resultOfFilter.push(item);
    }
    return resultOfFilter;
  }