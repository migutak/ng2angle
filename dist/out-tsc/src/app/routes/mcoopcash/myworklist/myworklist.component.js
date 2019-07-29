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
var MyworklistComponent = /** @class */ (function () {
    function MyworklistComponent(ecolService, http) {
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
                field: 'CLIENTNAME'
            },
            {
                headerName: 'AMOUNTDISBURCED',
                field: 'AMOUNTDISBURCED'
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
                field: 'LOAN_TYPE'
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
    MyworklistComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // console.log(this.model);
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink + '/activitylog?accnumber=' + this.model.loanaccnumber + '&custnumber=' + this.model.loanaccnumber + '&username=' + this.username + '&sys=mcoopcash', '_blank');
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
        this.http.get(environment.api + '/api/mcoopcash_stage/search?searchtext=' + this.model.searchText).subscribe(function (resp) {
            //
            _this.gridApi.updateRowData({ add: resp, addIndex: 0 });
        });
    };
    MyworklistComponent.prototype.clear = function () {
        var dataSource = {
            getRows: function (params) {
                params.successCallback([], 0);
            }
        };
        this.gridOptions.api.setDatasource(dataSource);
    };
    MyworklistComponent.prototype.reset = function () {
        // location.reload();
        this.clear();
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    MyworklistComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.ecolService.totalmcoopcashmyworklist(this.username).subscribe(function (worklist) {
            _this.noTotal = worklist[0].TOTALMYWORKLIST;
        });
    };
    MyworklistComponent.prototype.gridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    MyworklistComponent.prototype.apiService = function (perPage, currentPos) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(environment.api + '/api/mcoopcash_stage/worklist?colofficer=' + this.username + '&filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
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