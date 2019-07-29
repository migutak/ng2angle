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
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as $ from 'jquery';
var DemandsdueComponent = /** @class */ (function () {
    function DemandsdueComponent(ecolService, http) {
        var _this = this;
        this.ecolService = ecolService;
        this.http = http;
        this.model = {};
        this.total = {};
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.resizeEvent = 'resize.ag-grid';
        this.$win = $(window);
        this.new = true;
        this.columnDefs = [
            {
                headerName: 'ACCNUMBER',
                field: 'accnumber',
                cellRenderer: function (params) {
                    return '<a  href="#" target="_blank">' + params.value + '</a>';
                }
            },
            {
                headerName: 'CLIENTNAME',
                field: 'client_name'
            },
            {
                headerName: 'OUSTBALANCE',
                field: 'oustbalance',
                valueFormatter: this.currencyFormatter
            },
            {
                headerName: 'DAYSINARR',
                field: 'daysinarr',
                cellStyle: function (params) {
                    if (params.value < '30') {
                        return { color: 'blue' };
                    }
                    else if (params.value > '60') {
                        return { color: 'red' };
                    }
                    else {
                        return null;
                    }
                }
            },
            {
                headerName: 'TOTALARREARS',
                field: 'totalarrears',
                valueFormatter: this.currencyFormatter
            },
            {
                headerName: 'ADDRESS',
                field: 'address'
            },
            {
                headerName: 'PRODUCT',
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
    }
    DemandsdueComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // console.log(this.model);
        // tslint:disable-next-line:max-line-length
        // window.open(environment.applink + '/activitylog?accnumber=' + this.model.loanaccnumber + '&custnumber=' + this.model.loanaccnumber + '&username=' + this.username + '&sys=mcoopcash', '_blank');
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink + '/sendletter?accnumber=' + this.model.accnumber + '&custnumber=' + this.model.custnumber + '&username=' + this.username, '_blank');
    };
    DemandsdueComponent.prototype.onQuickFilterChanged = function ($event) {
        // this.gridOptions.api.setQuickFilter($event.target.value);
        this.searchText = $event.target.value;
    };
    DemandsdueComponent.prototype.currencyFormatter = function (params) {
        return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
    DemandsdueComponent.prototype.onSearch = function () {
        var _this = this;
        if (this.model.searchText === undefined) {
            return;
        }
        this.clear();
        this.http.get(environment.api + '/api/demandsdue/search?searchtext=' + this.model.searchText).subscribe(function (resp) {
            //
            _this.gridApi.updateRowData({ add: resp, addIndex: 0 });
        });
    };
    DemandsdueComponent.prototype.clear = function () {
        var ds = {
            getRows: function (params) {
                params.successCallback([], 0);
            }
        };
        this.gridOptions.api.setDatasource(ds);
    };
    DemandsdueComponent.prototype.reset = function () {
        // location.reload();
        this.clear();
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    DemandsdueComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.ecolService.totaldemandsdue().subscribe(function (viewall) {
            _this.noTotal = viewall[0].TOTALVIEWALL;
        });
    };
    DemandsdueComponent.prototype.gridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    DemandsdueComponent.prototype.apiService = function (perPage, currentPos) {
        return this.http.get(environment.api + '/api/demandsdue?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
    };
    DemandsdueComponent.prototype.refreshgrid = function () {
        //
    };
    DemandsdueComponent = __decorate([
        Component({
            selector: 'app-demandsdue',
            templateUrl: './demandsdue.component.html',
            styleUrls: ['./demandsdue.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService, HttpClient])
    ], DemandsdueComponent);
    return DemandsdueComponent;
}());
export { DemandsdueComponent };
//# sourceMappingURL=demandsdue.component.js.map