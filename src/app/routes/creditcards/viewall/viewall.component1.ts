
// src/app/my-grid-application/my-grid-application.component.ts
import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
import { environment } from '../../../../environments/environment';
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
    private defaultColDef;
    private components;
    private rowSelection;
    private rowModelType;
    private enableRangeSelection;
    private enableCharts;
    private cacheOverflowSize;
    private maxConcurrentDatasourceRequests;
    private infiniteInitialRowCount;
    private maxBlocksInCache;
    private paginationPageSize;
    private cacheBlockSize;
    private getRowNodeId;
    private rowData: [];
  
    constructor(private http: HttpClient) {
      this.columnDefs = [
        {
          headerName: "ID",
          width: 50,
          valueGetter: "node.id",
          cellRenderer: "loadingRenderer",
          sortable: false,
          suppressMenu: true
        },
        {
          headerName: "Athlete",
          field: "athlete",
          width: 150,
          suppressMenu: true,
          filter: "agTextColumnFilter",
        },
        {
          headerName: "Age",
          field: "age",
          width: 90,
          filter: "agNumberColumnFilter",
          filterParams: {
            filterOptions: ["equals", "lessThan", "greaterThan"]
          }
        },
        {
          headerName: "Country",
          field: "country",
          width: 120,
          filter: "agSetColumnFilter",
          filterParams: { values: countries() }
        },
        {
          headerName: "Year",
          field: "year",
          width: 90,
          filter: "agSetColumnFilter",
          filterParams: {
            values: ["2000", "2004", "2008", "2012"]
          }
        },
        {
          headerName: "Date",
          field: "date",
          width: 110
        },
        {
          headerName: "Sport",
          field: "sport",
          width: 110,
          suppressMenu: true
        },
        {
          headerName: "Gold",
          field: "gold",
          width: 100,
          suppressMenu: true
        },
        {
          headerName: "Silver",
          field: "silver",
          width: 100,
          suppressMenu: true
        },
        {
          headerName: "Bronze",
          field: "bronze",
          width: 100,
          suppressMenu: true
        },
        {
          headerName: "Total",
          field: "total",
          width: 100,
          suppressMenu: true
        }
      ];
      this.defaultColDef = {
        sortable: true,
        resizable: true
        
        
      };
      this.components = {
        loadingRenderer: function(params) {
          if (params.value !== undefined) {
            return params.value;
          } else {
            return '<img src="../images/loading.gif">';
          }
        }
      };
      this.rowSelection = "multiple";
      this.enableRangeSelection= true;
      this.rowModelType = "infinite";
      this.cacheOverflowSize = 2;
      this.maxConcurrentDatasourceRequests = 2;
      this.infiniteInitialRowCount = 1;
      this.maxBlocksInCache = 2;
      this.enableCharts= true;
      this.paginationPageSize = 10;
      this.cacheBlockSize = 10;
      this.getRowNodeId = function(item) {
        return item.id;
      };
    }
  
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
  
      this.http
        .get<any>("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json/filter[limit]=5")
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
        if (filterModel.year.indexOf(item.year.toString()) < 0) {
          continue;
        }
      }
      if (filterModel.country) {
        if (filterModel.country.indexOf(item.country) < 0) {
          continue;
        }
      }
      resultOfFilter.push(item);
    }
    return resultOfFilter;
  }

