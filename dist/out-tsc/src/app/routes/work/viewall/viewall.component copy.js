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
var ViewallComponent = /** @class */ (function () {
    function ViewallComponent(ecolService, http) {
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
                filter: "agTextColumnFilter",
                cellRenderer: function (params) {
                    return '<a  href="#" target="_blank">' + params.value + '</a>';
                },
            },
            {
                headerName: 'CUSTNUMBER',
                field: 'custnumber',
            },
            {
                headerName: 'CUSTNAME',
                field: 'client_name'
                // width: 450,
                // resizable: true
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
                },
            },
            {
                headerName: 'TOTALARREARS',
                field: 'instamount',
                // resizable: true,
                valueFormatter: this.currencyFormatter
            },
            {
                headerName: 'OUSTBALANCE',
                field: 'oustbalance',
                valueFormatter: this.currencyFormatter
                // resizable: true
            },
            {
                headerName: 'BUCKET',
                field: 'bucket'
                // resizable: true
            },
            {
                headerName: 'AROCODE',
                field: 'arocode'
                // resizable: true
            },
            {
                headerName: 'RROCODE',
                field: 'rrocode',
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
                    _this.gridOptions.api.hideOverlay();
                });
            }
        };
        this.gridOptions = {
            enableSorting: true,
            enableFilter: true,
            headerHeight: 40,
            pagination: true,
            rowSelection: 'single',
            rowModelType: 'infinite',
            cacheBlockSize: 20,
            paginationPageSize: 20
        };
        this.overlayLoadingTemplate =
            // tslint:disable-next-line:max-line-length
            '<img src="assets/img/user/cooop1.gif" />';
        this.overlayNoRowsTemplate =
            '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is a custom \'no rows\' overlay</span>';
    }
    ViewallComponent.prototype.currencyFormatter = function (params) {
        return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
    ViewallComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // console.log(this.model);
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink + '/activitylog?accnumber=' + this.model.accnumber + '&custnumber=' + this.model.custnumber + '&username=' + this.currentUser.username + '&sys=collections', '_blank');
    };
    // onQuickFilterChanged($event) {
    //   // this.gridOptions.api.setQuickFilter($event.target.value);
    //   this.searchText = $event.target.value;
    // }
    ViewallComponent.prototype.onSearch = function () {
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
                    _this.gridOptions.api.hideOverlay();
                });
            }
        };
        this.gridApi.setDatasource(this.dataSource);
    };
    ViewallComponent.prototype.clear = function () {
        var ds = {
            getRows: function (params) {
                params.successCallback([], 0);
            }
        };
        this.gridOptions.api.setDatasource(ds);
    };
    ViewallComponent.prototype.reset = function () {
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
                    _this.gridOptions.api.hideOverlay();
                });
            }
        };
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    ViewallComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        /*this.ecolService.totaltqall().subscribe(viewall => {
          this.noTotal = viewall[0].TOTALVIEWALL;
        });*/
    };
    ViewallComponent.prototype.gridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
        this.gridOptions.api.showLoadingOverlay();
    };
    ViewallComponent.prototype.apiService = function (perPage, currentPos) {
        // return this.http.get<any>(environment.api + '/api/qall?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
        return this.http.get(environment.api + '/api/tqall/paged?limit=' + perPage + '&page=' + currentPos);
    };
    ViewallComponent.prototype.apiServiceSearch = function (perPage, currentPos) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(environment.api + '/api/tqall/search?searchtext=' + this.model.searchText + '&limit=' + perPage + '&page=' + currentPos);
    };
    ViewallComponent = __decorate([
        Component({
            selector: 'app-viewall',
            templateUrl: './viewall.component.html',
            styleUrls: ['./viewall.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService, HttpClient])
    ], ViewallComponent);
    return ViewallComponent;
}());
export { ViewallComponent };
//# sourceMappingURL=viewall.component copy.js.map