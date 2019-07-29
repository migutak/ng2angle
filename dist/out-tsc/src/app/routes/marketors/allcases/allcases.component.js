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
import { Router } from '@angular/router';
var AllCasesComponent = /** @class */ (function () {
    // private rowClassRules;
    function AllCasesComponent(ecolService, http, router) {
        var _this = this;
        this.ecolService = ecolService;
        this.http = http;
        this.router = router;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.resizeEvent = 'resize.ag-grid';
        this.$win = $(window);
        this.new = true;
        this.model = {};
        this.columnDefs = [
            {
                headerName: 'CARDACCT',
                field: 'cardacct',
                cellRenderer: function (params) {
                    return '<a  href="#" target="_blank">' + params.value + '</a>';
                },
                resizable: true,
            },
            {
                headerName: 'CARDNUMBER',
                field: 'cardnumber',
                resizable: true,
                filter: true
            },
            {
                headerName: 'CARDNAME',
                field: 'cardname',
                resizable: true,
                filter: true
            },
            {
                headerName: 'DAYSINARREARS',
                field: 'daysinarrears',
                resizable: true,
                filter: true
            },
            {
                headerName: 'EXPPMNT',
                field: 'exppmnt',
                resizable: true,
            },
            {
                headerName: 'OUTBALANCE',
                field: 'outbalance',
                resizable: true,
            },
            {
                headerName: 'CYCLE',
                field: 'cycle',
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
    AllCasesComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink + '/marketorupdate?accnumber=' + this.model.accnumber + '&custnumber=' + this.model.custnumber + '&username=' + this.username + '&sys=marketer', '_blank');
    };
    AllCasesComponent.prototype.onQuickFilterChanged = function ($event) {
        // this.gridOptions.api.setQuickFilter($event.target.value);
        this.searchText = $event.target.value;
    };
    AllCasesComponent.prototype.onSearch = function () {
        var _this = this;
        if (this.model.searchText === undefined) {
            return;
        }
        this.clear();
        this.http.get(environment.api + '/api/marketors/search?searchtext=' + this.model.searchText).subscribe(function (resp) {
            //
            _this.gridApi.updateRowData({ add: resp, addIndex: 0 });
        });
    };
    AllCasesComponent.prototype.clear = function () {
        var ds = {
            getRows: function (params) {
                params.successCallback([], 0);
            }
        };
        this.gridOptions.api.setDatasource(ds);
    };
    AllCasesComponent.prototype.reset = function () {
        // location.reload();
        this.clear();
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    AllCasesComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
    };
    AllCasesComponent.prototype.gridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    AllCasesComponent.prototype.apiService = function (perPage, currentPos) {
        return this.http.get(environment.api + '/api/marketors?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
    };
    AllCasesComponent.prototype.update = function (id) {
        // redirect to ListComponent
        this.router.navigate(['/marketors/update/' + id]);
    };
    AllCasesComponent.prototype.addnew = function () {
        // redirect to ListComponent
        this.router.navigate(['/marketors/newcase']);
    };
    AllCasesComponent = __decorate([
        Component({
            selector: 'app-allcases',
            templateUrl: './allcases.component.html',
            styleUrls: ['./allcases.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService, HttpClient, Router])
    ], AllCasesComponent);
    return AllCasesComponent;
}());
export { AllCasesComponent };
//# sourceMappingURL=allcases.component.js.map