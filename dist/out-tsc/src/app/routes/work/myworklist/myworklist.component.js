var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
var MyworklistComponent = /** @class */ (function () {
    function MyworklistComponent(ecolService, http) {
        var _this = this;
        this.ecolService = ecolService;
        this.http = http;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.resizeEvent = 'resize.ag-grid';
        this.$win = $(window);
        this.new = true;
        this.model = {};
        // private rowClassRules;
        this.columnDefs = [
            {
                headerName: 'ACCNUMBER',
                field: 'accnumber',
                cellRenderer: function (params) {
                    return '<a  href="#" target="_blank">' + params.value + '</a>';
                },
                width: 250
            },
            {
                headerName: 'CUSTNUMBER',
                field: 'custnumber'
            },
            {
                headerName: 'CUST_NAME',
                field: 'client_name',
                width: 350
            },
            {
                headerName: 'DAYSINARREARS',
                field: 'daysinarr',
                cellStyle: function (params) {
                    if (params.value < '30') {
                        return { color: 'red' };
                    }
                    else if (params.value > '90') {
                        return { color: 'red' };
                    }
                    else {
                        return null;
                    }
                }
            },
            {
                headerName: 'TOTALARREARS',
                field: 'instamount',
                valueFormatter: this.currencyFormatter
            },
            {
                headerName: 'OUSTBALANCE',
                field: 'oustbalance',
                valueFormatter: this.currencyFormatter
            },
            {
                headerName: 'BUCKET',
                field: 'bucket'
            },
            {
                headerName: 'AROCODE',
                field: 'arocode'
            },
            {
                headerName: 'SECTION',
                field: 'section'
            },
            {
                headerName: 'COLOFFICER',
                field: 'colofficer'
            }
        ];
        this.dataSource = {
            getRows: function (params) {
                // Use startRow and endRow for sending pagination to Backend
                // params.startRow : Start Page
                // params.endRow : End Page
                //
                _this.apiService(20, params.startRow).subscribe(function (response) {
                    params.successCallback(response.rows, response.total);
                    if (response.rows.length > 0) {
                        _this.gridOptions.api.hideOverlay();
                    }
                    else {
                        _this.gridOptions.api.showNoRowsOverlay();
                    }
                });
            }
        };
        this.gridOptions = {
            headerHeight: 40,
            pagination: true,
            rowSelection: 'single',
            rowModelType: 'infinite',
            cacheBlockSize: 20,
            paginationPageSize: 20
        };
        this.overlayLoadingTemplate =
            // tslint:disable-next-line:max-line-length
            '<span class="ag-overlay-loading-center" style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">Please wait while your rows are loading</span>';
        this.overlayNoRowsTemplate =
            '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">Response: \'no rows\' found</span>';
    }
    MyworklistComponent.prototype.currencyFormatter = function (params) {
        return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
    MyworklistComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // console.log(this.model);
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink + '/activitylog?accnumber=' + this.model.accnumber + '&custnumber=' + this.model.custnumber + '&username=' + this.currentUser.username + '&sys=collections', '_blank');
    };
    MyworklistComponent.prototype.onQuickFilterChanged = function ($event) {
        // this.gridOptions.api.setQuickFilter($event.target.value);
        this.searchText = $event.target.value;
    };
    MyworklistComponent.prototype.onSearch = function () {
        var _this = this;
        if (this.model.searchText === undefined) {
            return;
        }
        this.clear();
        this.gridApi.showLoadingOverlay();
        /*this.http.get<any>(environment.api + '/api/qall/search?searchtext=' + this.model.searchText).subscribe(resp => {
          //
          this.gridApi.updateRowData({ add: resp, addIndex: 0 });
          this.gridApi.hideOverlay();
        });*/
        this.dataSource = {
            getRows: function (params) {
                // Use startRow and endRow for sending pagination to Backend
                // params.startRow : Start Page
                // params.endRow : End Page
                //
                _this.apiServiceSearch(20, params.startRow).subscribe(function (response) {
                    console.log(response);
                    params.successCallback(response.rows, response.total);
                    if (response.rows.length > 0) {
                        _this.gridOptions.api.hideOverlay();
                    }
                    else {
                        _this.gridOptions.api.showNoRowsOverlay();
                    }
                });
            }
        };
        this.gridApi.setDatasource(this.dataSource);
    };
    MyworklistComponent.prototype.clear = function () {
        var ds = {
            getRows: function (params) {
                params.successCallback([], 0);
            }
        };
        this.gridOptions.api.setDatasource(ds);
    };
    MyworklistComponent.prototype.reset = function () {
        var _this = this;
        this.gridApi.showLoadingOverlay();
        this.clear();
        this.dataSource = {
            getRows: function (params) {
                // Use startRow and endRow for sending pagination to Backend
                // params.startRow : Start Page
                // params.endRow : End Page
                //
                _this.apiService(20, params.startRow).subscribe(function (response) {
                    params.successCallback(response.rows, response.total);
                    if (response.rows.length > 0) {
                        _this.gridOptions.api.hideOverlay();
                    }
                    else {
                        _this.gridOptions.api.showNoRowsOverlay();
                    }
                });
            }
        };
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    MyworklistComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
    };
    MyworklistComponent.prototype.gridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
        this.gridOptions.api.showLoadingOverlay();
    };
    MyworklistComponent.prototype.apiService = function (perPage, currentPos) {
        // return this.http.get<any>(environment.api + '/api/qall?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
        // tslint:disable-next-line:max-line-length
        return this.http.get(environment.api + '/api/tqall/paged/myallocation?colofficer=' + this.username + '&limit=' + perPage + '&page=' + currentPos);
    };
    MyworklistComponent.prototype.apiServiceSearch = function (perPage, currentPos) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(environment.api + '/api/tqall/search?searchtext=' + this.model.searchText + '&limit=' + perPage + '&page=' + currentPos);
    };
    MyworklistComponent = __decorate([
        Component({
            selector: 'app-myworklist',
            templateUrl: './myworklist.component.html',
            styleUrls: ['./myworklist.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService, HttpClient])
    ], MyworklistComponent);
    return MyworklistComponent;
}());
export { MyworklistComponent };
//# sourceMappingURL=myworklist.component.js.map