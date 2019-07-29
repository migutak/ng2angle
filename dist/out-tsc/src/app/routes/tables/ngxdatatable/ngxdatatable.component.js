var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
var _clone = function (d) { return JSON.parse(JSON.stringify(d)); };
var NgxdatatableComponent = /** @class */ (function () {
    function NgxdatatableComponent() {
        var _this = this;
        this.editing = {};
        this.rows = [];
        this.rowsFilter = [];
        this.rowsExp = [];
        this.rowsSort = [];
        this.temp = [];
        this.expanded = {};
        this.rowsSel = [];
        this.selected = [];
        this.columns = [
            { prop: 'name' },
            { name: 'Company' },
            { name: 'Gender' }
        ];
        this.columnsSort = [
            { prop: 'name' },
            { name: 'Company' },
            { name: 'Gender' }
        ];
        this.fetch(function (data) {
            // cache our list
            _this.temp = _clone(data);
            _this.rows = _clone(data);
            _this.rowsFilter = _clone(data);
            _this.rowsExp = _clone(data);
            _this.rowsSort = _clone(data);
            _this.rowsSel = _clone(data);
        });
    }
    NgxdatatableComponent.prototype.onPage = function (event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            console.log('paged!', event);
        }, 100);
    };
    NgxdatatableComponent.prototype.toggleExpandRow = function (row) {
        console.log('Toggled Expand Row!', row);
        this.tableExp.rowDetail.toggleExpandRow(row);
    };
    NgxdatatableComponent.prototype.onDetailToggle = function (event) {
        console.log('Detail Toggled', event);
    };
    NgxdatatableComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    NgxdatatableComponent.prototype.updateValue = function (event, cell, rowIndex) {
        console.log('inline editing rowIndex', rowIndex);
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = this.rows.slice();
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    };
    NgxdatatableComponent.prototype.ngOnInit = function () {
    };
    NgxdatatableComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rowsFilter = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    };
    // Selection
    NgxdatatableComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        (_b = this.selected).push.apply(_b, selected);
    };
    NgxdatatableComponent.prototype.onActivate = function (event) {
        console.log('Activate Event', event);
    };
    __decorate([
        ViewChild(DatatableComponent),
        __metadata("design:type", DatatableComponent)
    ], NgxdatatableComponent.prototype, "table", void 0);
    __decorate([
        ViewChild('myTable'),
        __metadata("design:type", Object)
    ], NgxdatatableComponent.prototype, "tableExp", void 0);
    NgxdatatableComponent = __decorate([
        Component({
            selector: 'app-ngxdatatable',
            templateUrl: './ngxdatatable.component.html',
            styleUrls: ['./ngxdatatable.component.scss'],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [])
    ], NgxdatatableComponent);
    return NgxdatatableComponent;
}());
export { NgxdatatableComponent };
//# sourceMappingURL=ngxdatatable.component.js.map