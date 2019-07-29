var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// src/app/my-grid-application/my-grid-application.component.ts
import { Component } from "@angular/core";
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
var ViewallComponent = /** @class */ (function () {
    function ViewallComponent(http) {
        var _this = this;
        this.http = http;
        this.model = {};
        this.gridOptions = {
            unSortIcon: true,
            // suppressCellSelection: true,
            enableColResize: true,
            domLayout: 'autoHeight',
            // rowSelection: 'single',
            // rowModelType: 'normal',
            pagination: true,
            paginationPageSize: 20,
            onGridReady: function (params) {
                params.api.sizeColumnsToFit();
                _this.gridApi = params.api;
                _this.gridColumnApi = params.columnApi;
                // this.gridApi.setDatasource(this.dataSource);
                _this.http
                    .get(environment.api + "/api/tcards")
                    .subscribe(function (data) {
                    params.api.setRowData(data);
                });
            },
            onGridSizeChanged: function (params) {
                params.api.sizeColumnsToFit();
            }
        };
        this.gridOptions.columnDefs = [
            {
                headerName: 'CARDACCT',
                field: 'cardacct',
                cellRenderer: function (params) {
                    return '<a  href="#" target="_blank">' + params.value + '</a>';
                },
                width: 90,
            },
            {
                headerName: 'CARDNUMBER',
                field: 'cardnumber',
                width: 90,
            },
            {
                headerName: 'CARDNAME',
                field: 'cardname',
                width: 90,
            },
            {
                headerName: 'DAYSINARREARS',
                field: 'daysinarrears',
                width: 90,
            },
            {
                headerName: 'EXPPMNT',
                field: 'exppmnt',
                width: 90,
            },
            {
                headerName: 'OUTSTANDING BALANCE',
                field: 'outbalance',
                width: 90,
            },
            {
                headerName: 'LIMIT',
                field: 'limit',
                width: 90,
            },
            {
                headerName: 'CYCLE',
                field: 'cycle',
                width: 90,
            },
            {
                headerName: 'COLOFFICER',
                field: 'colofficer',
                width: 90,
            },
        ];
        this.sortingOrder = ["desc", "asc"];
    }
    ViewallComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        /*this.ecolService.totaltqall().subscribe(viewall => {
          this.noTotal = viewall[0].TOTALVIEWALL;
        });*/
    };
    ;
    ViewallComponent.prototype.onBtExport = function () {
        var params = {
            skipHeader: false,
            skipFooters: true,
            skipGroups: true,
            fileName: "export.csv"
        };
        this.gridApi.exportDataAsCsv(params);
    };
    ViewallComponent.prototype.quickSearch = function () {
        this.gridApi.setQuickFilter(this.searchValue);
    };
    ViewallComponent = __decorate([
        Component({
            selector: 'app-viewall',
            templateUrl: './viewall.component.html',
            styleUrls: ['./viewall.component.scss']
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ViewallComponent);
    return ViewallComponent;
}());
export { ViewallComponent };
//# sourceMappingURL=viewall.component.js.map