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
var MyallocationsComponent = /** @class */ (function () {
    function MyallocationsComponent(ecolService, http) {
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
                headerName: 'DAYSINARREARS',
                field: 'DAYSINARREARS',
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
            },
            {
                headerName: 'COLOFFICER',
                field: 'COLOFFICER',
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
    MyallocationsComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // console.log(this.model);
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink + '/activitylog?accnumber=' + this.model.CARDACCT + '&custnumber=' + this.model.CARDACCT + '&username=' + this.username + '&sys=cc', '_blank');
    };
    MyallocationsComponent.prototype.onQuickFilterChanged = function ($event) {
        // this.gridOptions.api.setQuickFilter($event.target.value);
        this.searchText = $event.target.value;
    };
    MyallocationsComponent.prototype.onSearch = function () {
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
    MyallocationsComponent.prototype.clear = function () {
        var ds = {
            getRows: function (params) {
                params.successCallback([], 0);
            }
        };
        this.gridOptions.api.setDatasource(ds);
    };
    MyallocationsComponent.prototype.reset = function () {
        // location.reload();
        this.clear();
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    MyallocationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.ecolService.totalcreditcardsmyallocation(this.username).subscribe(function (viewall) {
            _this.noTotal = viewall[0].TOTALMYALLOCATION;
        });
    };
    MyallocationsComponent.prototype.gridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    MyallocationsComponent.prototype.apiService = function (perPage, currentPos) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(environment.api + '/api/tcards/myallocations?colofficer=' + this.username + '&filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
    };
    MyallocationsComponent = __decorate([
        Component({
            selector: 'app-myallocations',
            templateUrl: './myallocations.component.html',
            styleUrls: ['./myallocations.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService, HttpClient])
    ], MyallocationsComponent);
    return MyallocationsComponent;
}());
export { MyallocationsComponent };
//# sourceMappingURL=myallocations.component.js.map