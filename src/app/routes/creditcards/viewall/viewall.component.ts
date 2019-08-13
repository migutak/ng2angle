
// src/app/my-grid-application/my-grid-application.component.ts
import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
import { environment } from '../../../../environments/environment';


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
  
    constructor(private http: HttpClient) {

      this.columnDefs = [

        {
          headerName: 'CARDACCT',
          field: 'cardacct',
          filter: "agTextColumnFilter",
          cellRenderer: function (params) {
            return '<a  href="#" target="_blank">' + params.value + '</a>';
          },
          width: 90,
        },
        {
          headerName: 'CARDNUMBER',
          field: 'cardnumber',
          width: 90,
          cellRenderer: "loadingRenderer",
          filter: "agTextColumnFilter",
          sortable: false,
          suppressMenu: true,
  
        },
        {
          headerName: 'CARDNAME',
          field: 'cardname',
          width: 90,
          filter: "agTextColumnFilter",
  
        },
        {
          headerName: 'DAYSINARREARS',
          field: 'daysinarrears',
          width: 90,
          filter: "agTextColumnFilter",
        },
        {
          headerName: 'EXPPMNT',
          field: 'exppmnt',
          width: 90,
          filter: "agTextColumnFilter",
        },
        {
          headerName: 'OUTSTANDING BALANCE',
          field: 'outbalance',
          width: 90,
          filter: "agTextColumnFilter",
        },
        {
          headerName: 'LIMIT',
          field: 'limit',
          width: 90,
          filter: "agTextColumnFilter",
        },
        {
          headerName: 'CYCLE',
          field: 'cycle',
          width: 90,
          filter: "agTextColumnFilter",
        },
        {
          headerName: 'COLOFFICER',
          field: 'colofficer',
          width: 90,
          filter: "agTextColumnFilter",
        },
  
  
  
      ];
      this.components = {
        loadingRenderer: function(params) {
          if (params.value !== undefined) {
            return params.value;
          } else {
            return '<img src="../images/loading.gif">';
          }
        }
      };
      this.defaultColDef = {
        sortable: true,
        resizable: true
      };
      this.rowSelection = "multiple";
      this.rowModelType = "infinite";
      this.paginationPageSize = 100;
      this.cacheOverflowSize = 2;
      this.maxConcurrentDatasourceRequests = 2;
      this.infiniteInitialRowCount = 1;
      this.maxBlocksInCache = 2;
      this.getRowNodeId = function(item) {
        return item.id;
      };
    }




     
  
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
  
      this.http
        .get<any>("http://localhost:3000/api/mcoopcash_stage")
        .subscribe(data => {
          data.forEach(function(data, index) {
            data.id = "R" + (index + 1);
          });
          var dataSource = {
            rowCount: null,
            getRows: function(params) {
              console.log("asking for " + params.startRow + " to " + params.endRow);
              // setTimeout(function() {
              //   var dataAfterSortingAndFiltering = sortAndFilter(data, params.sortModel, params.filterModel);
              //   var rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
              //   var lastRow = -1;
              //   if (dataAfterSortingAndFiltering.length <= params.endRow) {
              //     lastRow = dataAfterSortingAndFiltering.length;
              //   }
              //   params.successCallback(rowsThisPage, lastRow);
              // }, 500);
            }
          };
          params.api.setDatasource(dataSource);
        });
    }
  }
  
  
  // function sortAndFilter(allOfTheData, sortModel, filterModel) {
  //   return sortData(sortModel, filterData(filterModel, allOfTheData));
  // }
  // function sortData(sortModel, data) {
  //   var sortPresent = sortModel && sortModel.length > 0;
  //   if (!sortPresent) {
  //     return data;
  //   }
  //   var resultOfSort = data.slice();
  //   resultOfSort.sort(function(a, b) {
  //     for (var k = 0; k < sortModel.length; k++) {
  //       var sortColModel = sortModel[k];
  //       var valueA = a[sortColModel.colId];
  //       var valueB = b[sortColModel.colId];
  //       if (valueA == valueB) {
  //         continue;
  //       }
  //       var sortDirection = sortColModel.sort === "asc" ? 1 : -1;
  //       if (valueA > valueB) {
  //         return sortDirection;
  //       } else {
  //         return sortDirection * -1;
  //       }
  //     }
  //     return 0;
  //   });
  //   return resultOfSort;
  // }
  // function filterData(filterModel, data) {
  //   var filterPresent = filterModel && Object.keys(filterModel).length > 0;
  //   if (!filterPresent) {
  //     return data;
  //   }
  //   var resultOfFilter = [];
  //   for (var i = 0; i < data.length; i++) {
  //     var item = data[i];
  //     if (filterModel.age) {
  //       var age = item.age;
  //       var allowedAge = parseInt(filterModel.age.filter);
  //       if (filterModel.age.type == "equals") {
  //         if (age !== allowedAge) {
  //           continue;
  //         }
  //       } else if (filterModel.age.type == "lessThan") {
  //         if (age >= allowedAge) {
  //           continue;
  //         }
  //       } else {
  //         if (age <= allowedAge) {
  //           continue;
  //         }
  //       }
  //     }
  //     if (filterModel.year) {
  //       if (filterModel.year.values.indexOf(item.year.toString()) < 0) {
  //         continue;
  //       }
  //     }
  //     if (filterModel.country) {
  //       if (filterModel.country.values.indexOf(item.country) < 0) {
  //         continue;
  //       }
  //     }
  //     resultOfFilter.push(item);
  //   }
  //   return resultOfFilter;
  // }









