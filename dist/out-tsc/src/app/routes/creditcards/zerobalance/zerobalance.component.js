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
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as $ from 'jquery';
import { EcolService } from '../../../services/ecol.service';
var ZerobalanceComponent = /** @class */ (function () {
    function ZerobalanceComponent(ecolService, http) {
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
                headerName: 'CARDACCT',
                field: 'CARDACCT',
                cellRenderer: function (params) {
                    return '<a  href="#" target="_blank">' + params.value + '</a>';
                },
                resizable: true,
            },
            {
                headerName: 'CARDNUMBER',
                field: 'CARDNUMBER',
                resizable: true,
                filter: true
            },
            {
                headerName: 'CARDNAME',
                field: 'CARDNAME',
                resizable: true,
                filter: true
            },
            {
                headerName: 'DATEDISBURSED',
                field: 'DATEDISBURSED',
                resizable: true,
                filter: true
            },
            {
                headerName: 'LIMIT',
                field: 'LIMIT',
                resizable: true,
                filter: true
            },
            {
                headerName: 'EXPPMNT',
                field: 'EXPPMNT',
                resizable: true,
            },
            {
                headerName: 'OUTBALANCE',
                field: 'OUTBALANCE',
                resizable: true,
            },
            {
                headerName: 'CYCLE',
                field: 'CYCLE',
                resizable: true,
            }
        ];
        this.dataSource = {
            getRows: function (params) {
                // Use startRow and endRow for sending pagination to Backend
                // params.startRow : Start Page
                // params.endRow : End Page
                //
                _this.apiService(20, params.startRow).subscribe(function (response) {
                    params.successCallback(response, _this.noTotal);
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
            '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is a custom \'no rows\' overlay</span>';
    }
    ZerobalanceComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink + '/activitylog?accnumber=' + this.model.cardacct + '&custnumber=' + this.model.cardacct + '&username=' + this.username + '&sys=watchcc', '_blank');
    };
    ZerobalanceComponent.prototype.onQuickFilterChanged = function ($event) {
        // this.gridOptions.api.setQuickFilter($event.target.value);
        this.searchText = $event.target.value;
    };
    ZerobalanceComponent.prototype.onSearch = function () {
        var _this = this;
        if (this.model.searchText === undefined) {
            return;
        }
        this.clear();
        this.http.get(environment.api + '/api/tcards/search?searchtext=' + this.model.searchText).subscribe(function (resp) {
            //
            _this.gridApi.updateRowData({ add: resp, addIndex: 0 });
        });
    };
    ZerobalanceComponent.prototype.clear = function () {
        var ds = {
            getRows: function (params) {
                params.successCallback([], 0);
            }
        };
        this.gridOptions.api.setDatasource(ds);
    };
    ZerobalanceComponent.prototype.reset = function () {
        // location.reload();
        this.clear();
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    ZerobalanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.ecolService.totalcardsclosed().subscribe(function (data) {
            _this.noTotal = data[0].TOTALCLOSED;
        });
    };
    ZerobalanceComponent.prototype.gridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    ZerobalanceComponent.prototype.apiService = function (perPage, currentPos) {
        return this.http.get(environment.api + '/api/tcards/closed?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
    };
    ZerobalanceComponent = __decorate([
        Component({
            selector: 'app-zerobalance',
            templateUrl: './zerobalance.component.html',
            styleUrls: ['./zerobalance.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService, HttpClient])
    ], ZerobalanceComponent);
    return ZerobalanceComponent;
}());
export { ZerobalanceComponent };
//# sourceMappingURL=zerobalance.component.js.map