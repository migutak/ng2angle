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
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.resizeEvent = 'resize.ag-grid';
        this.$win = $(window);
        this.new = true;
        this.model = {};
        // private rowClassRules;
        this.columnDefs = [
            {
                headerName: 'LOANACCNUMBER',
                field: 'LOANACCNUMBER',
                cellRenderer: function (params) {
                    return '<a  href="#" target="_blank">' + params.value + '</a>';
                }
            },
            {
                headerName: 'CLIENTNAME',
                field: 'clientname'
            },
            {
                headerName: 'AMOUNTDISBURCED',
                field: 'amountdisbursed'
            },
            {
                headerName: 'ARREARS CATEGIRY',
                field: 'arrears_category',
                cellStyle: function (params) {
                    if (params.value === '90+') {
                        return { color: 'red' };
                    }
                    else if (params.value === '180+') {
                        return { color: 'red' };
                    }
                    else {
                        return null;
                    }
                }
            },
            {
                headerName: 'LOAN TYPE',
                field: 'loan_type'
            },
            {
                headerName: 'EMPLOYER',
                field: 'employer'
            },
            {
                headerName: 'IDNUMBER',
                field: 'idnumber'
            },
            {
                headerName: 'AROCODE',
                field: 'arocode'
            }
        ];
        this.dataSource = {
            getRows: function (params) {
                // Use startRow and endRow for sending pagination to Backend
                // params.startRow : Start Page
                // params.endRow : End Page
                //
                _this.apiService(20, params.startRow).subscribe(function (response) {
                    console.log(response);
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
    MyallocationsComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // console.log(this.model);
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink + '/activitylog?accnumber=' + this.model.loanaccnumber + '&custnumber=' + this.model.loanaccnumber + '&username=' + this.username + '&sys=mcoopcash', '_blank');
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
        this.http.get(environment.api + '/api/mcoopcash_stage/search?searchtext=' + this.model.searchText).subscribe(function (resp) {
            //
            _this.gridApi.updateRowData({ add: resp, addIndex: 0 });
        });
    };
    MyallocationsComponent.prototype.clear = function () {
        var dataSource = {
            getRows: function (params) {
                params.successCallback([], 0);
            }
        };
        this.gridOptions.api.setDatasource(dataSource);
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
        this.ecolService.totalmcoopcashviewall().subscribe(function (viewall) {
            _this.noTotal = viewall[0].TOTALVIEWALL;
        });
    };
    MyallocationsComponent.prototype.gridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    MyallocationsComponent.prototype.apiService = function (perPage, currentPos) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(environment.api + '/api/mcoopcash_stage/myallocations?filter[colofficer]=' + this.username + 'filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
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