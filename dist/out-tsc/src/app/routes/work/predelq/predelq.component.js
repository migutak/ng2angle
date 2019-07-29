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
var PredelqComponent = /** @class */ (function () {
    function PredelqComponent(ecolService, http) {
        this.ecolService = ecolService;
        this.http = http;
        this.resizeEvent = 'resize.ag-grid';
        this.$win = $(window);
        this.new = true;
        this.model = {};
        this.rowData = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.columnDefs = [
            {
                field: 'athlete',
                width: 150,
                suppressSizeToFit: true,
                resizable: true
            },
            {
                field: 'age',
                width: 90,
                minWidth: 50,
                maxWidth: 100,
                resizable: true
            },
            {
                field: 'country',
                width: 120
            },
            {
                field: 'year',
                width: 90
            },
            {
                field: 'date',
                width: 110
            },
            {
                field: 'sport',
                width: 110
            },
            {
                field: 'gold',
                width: 100
            },
            {
                field: 'silver',
                width: 100
            },
            {
                field: 'bronze',
                width: 100
            },
            {
                field: 'total',
                width: 100
            }
        ];
        this.defaultColDef = { resizable: true };
    }
    PredelqComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
    };
    PredelqComponent.prototype.onGridReady = function (params) {
        var _this = this;
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.http
            .get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json')
            .subscribe(function (data) {
            _this.rowData = data;
        });
    };
    PredelqComponent.prototype.apiService = function (perPage, currentPos) {
        // return this.http.get<any>(environment.api + '/api/qall?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
        // tslint:disable-next-line:max-line-length
        return this.http.get(environment.api + '/api/tqall/paged/myallocation?colofficer=' + this.username + '&limit=' + perPage + '&page=' + currentPos);
    };
    PredelqComponent.prototype.apiServiceSearch = function (perPage, currentPos) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(environment.api + '/api/tqall/search?searchtext=' + this.model.searchText + '&limit=' + perPage + '&page=' + currentPos);
    };
    PredelqComponent = __decorate([
        Component({
            selector: 'app-predelq',
            templateUrl: './predelq.component.html',
            styleUrls: ['./predelq.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService, HttpClient])
    ], PredelqComponent);
    return PredelqComponent;
}());
export { PredelqComponent };
//# sourceMappingURL=predelq.component.js.map