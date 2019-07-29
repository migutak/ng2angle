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
var CreditwatchComponent = /** @class */ (function () {
    function CreditwatchComponent(ecolService, http) {
        var _this = this;
        this.ecolService = ecolService;
        this.http = http;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.resizeEvent = 'resize.ag-grid';
        this.$win = $(window);
        this.new = true;
        this.model = {};
        this.columnDefs = [
            {
                headerName: 'ACCNUMBER',
                field: 'accnumber',
                cellRenderer: function (params) {
                    return '<a  href="#" target="_blank">' + params.value + '</a>';
                },
                width: 250,
                resizable: true,
            },
            {
                headerName: 'CUSTNUMBER',
                field: 'custnumber',
                resizable: true, sortable: true, filter: true
            },
            {
                headerName: 'CUSTNAME',
                field: 'custname',
                width: 450,
                resizable: true
            },
            {
                headerName: 'OUSTBALANCE',
                field: 'oustbalance',
                resizable: true
            },
            {
                headerName: 'PRODUCTCODE',
                field: 'productcode',
                resizable: true,
            },
            {
                headerName: 'BRANCHCODE',
                field: 'branchcode',
                resizable: true
            },
            {
                headerName: 'AROCODE',
                field: 'arocode',
                resizable: true
            },
            {
                headerName: 'RROCODE',
                field: 'rrocode',
                resizable: true,
                filter: true,
                sortable: true,
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
            defaultColDef: {
                resizable: true,
            },
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
            '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is a custom \'no rows\' overlay</span>';
    }
    CreditwatchComponent.prototype.currencyFormatter = function (params) {
        return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
    CreditwatchComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // console.log(this.model);
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink + '/activitylog?accnumber=' + this.model.accnumber + '&custnumber=' + this.model.custnumber + '&username=' + this.currentUser.username + '&sys=watch', '_blank');
    };
    CreditwatchComponent.prototype.onQuickFilterChanged = function ($event) {
        // this.gridOptions.api.setQuickFilter($event.target.value);
        this.searchText = $event.target.value;
    };
    CreditwatchComponent.prototype.onSearch = function () {
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
    CreditwatchComponent.prototype.clear = function () {
        var ds = {
            getRows: function (params) {
                params.successCallback([], 0);
            }
        };
        this.gridOptions.api.setDatasource(ds);
    };
    CreditwatchComponent.prototype.reset = function () {
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
    CreditwatchComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
    };
    CreditwatchComponent.prototype.gridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
        this.gridOptions.api.showLoadingOverlay();
    };
    CreditwatchComponent.prototype.apiService = function (perPage, currentPos) {
        // return this.http.get<any>(environment.api + '/api/qall?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
        return this.http.get(environment.api + '/api/watch_stage/paged?limit=' + perPage + '&page=' + currentPos);
    };
    CreditwatchComponent.prototype.apiServiceSearch = function (perPage, currentPos) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(environment.api + '/api/watch_stage/search?searchtext=' + this.model.searchText + '&limit=' + perPage + '&page=' + currentPos);
    };
    CreditwatchComponent = __decorate([
        Component({
            selector: 'app-creditwatch',
            templateUrl: './creditwatch.component.html',
            styleUrls: ['./creditwatch.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService, HttpClient])
    ], CreditwatchComponent);
    return CreditwatchComponent;
}());
export { CreditwatchComponent };
//# sourceMappingURL=creditwatch.component.js.map