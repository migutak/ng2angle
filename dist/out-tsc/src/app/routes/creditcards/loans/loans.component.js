var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { JqxDomService } from '../../../shared/jqwidgets-dom.service';
import { environment } from '../../../../environments/environment';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { EcolService } from '../../../services/ecol.service';
var LoansComponent = /** @class */ (function () {
    function LoansComponent(jqxDomService, ecolService) {
        var _this = this;
        this.jqxDomService = jqxDomService;
        this.ecolService = ecolService;
        this.total = {};
        // source: any = {};
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.source = {
            datatype: 'json',
            totalrecords: 100,
            // root: 'Rows',
            url: environment.api + '/api/tbl_q_all/viewallcc',
            filter: function () {
                // update the grid and send a request to the server.
                this.myGrid.applyfilters();
            },
            sort: function () {
                // update the grid and send a request to the server.
                // $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
            },
            beforeprocessing: function (data) {
                if (data != null && data.length > 0) {
                    //this.totalrecords = data.length;
                    this.totalrecords = data[0].totalRecords;
                }
            },
            datafields: [
                { name: 'CARDACCT', type: 'string' },
                { name: 'ACCOUNTNO', type: 'string' },
                { name: 'CARDNUMBER', type: 'string' },
                { name: 'CARDNAME', type: 'string' },
                { name: 'OUTBALANCE', type: 'number' },
                { name: 'EXPPMNT', type: 'number' },
                { name: 'DAYSINARREARS', type: 'number' },
                { name: 'ADDRESS', type: 'string' },
                { name: 'RPCODE', type: 'string' },
                { name: 'CITY', type: 'string' },
                { name: 'MOBILE', type: 'string' },
                { name: 'EMAILADDRESS', type: 'string' },
                { name: 'COLOFFICER', type: 'string' },
                { name: 'DUEDATE', type: 'date' },
                { name: 'CYCLE', type: 'string' },
                { name: 'SQNUMBER', type: 'string' }
            ],
        };
        this.dataAdapter = new jqx.dataAdapter(this.source, {
            downloadComplete: function (data, status, xhr) {
                if (!this.totalrecords) {
                    this.totalrecords = data.length;
                }
            },
            loadError: function (xhr, status, error) {
                throw new Error(error);
            }
        });
        this.rendergridrows = function (params) {
            var data = params.data;
            return data;
        };
        this.totalcolumnrenderer = function (row, column, cellvalue) {
            // let newCellValue = jqx.dataFormat.formatnumber(cellvalue, 'c2');
            return '<span style="margin: 6px 3px; font-size: 12px; float: right; font-weight: bold;">' + cellvalue + '</span>';
        };
        this.columns = [
            {
                text: 'CARDACCT', datafield: 'CARDACCT', width: 150, filtertype: 'input',
                createwidget: function (row, column, value, htmlElement, rowdata) {
                    var that = _this;
                    var container = document.createElement('div');
                    htmlElement.appendChild(container);
                    var result = _this.jqxDomService.loadComponent(jqxButtonComponent, container);
                    result.componentRef.instance.autoCreate = false;
                    // tslint:disable-next-line:no-shadowed-variable
                    result.componentRef.instance.onClick.subscribe(function (clickEvent, rowdata) {
                        that.onClickMe(clickEvent, rowdata);
                    });
                    result.componentRef.instance.createComponent({ value: value, width: 150, height: 30 });
                },
                initwidget: function (row, column, value, htmlElement) { }
            },
            { text: 'CARDNUMBER', datafield: 'CARDNUMBER', width: 150, filtertype: 'input' },
            { text: 'CARDNAME', datafield: 'CARDNAME', width: 200, filtertype: 'input' },
            { text: 'OUTBALANCE', datafield: 'OUTBALANCE', filtertype: 'input', cellsformat: 'd', cellsrenderer: this.totalcolumnrenderer, cellsalign: 'right' },
            { text: 'EXPPMNT', datafield: 'EXPPMNT', filtertype: 'input', cellsformat: 'd' },
            { text: 'DAYSINARR', datafield: 'DAYSINARREARS', filtertype: 'input', cellsformat: 'c' },
            { text: 'CYCLE', datafield: 'CYCLE', filtertype: 'input' },
            { text: 'COLOFFICER', datafield: 'colofficer', filtertype: 'input' },
            { text: 'SQNUMBER', datafield: 'SQNUMBER', filtertype: 'input' },
            { text: 'DUEDATE', datafield: 'DUEDATE', filtertype: 'range' }
        ];
    }
    ;
    LoansComponent.prototype.onClickMe = function (event, rowdata) {
        this.cardacct = event.target.textContent;
        // open page
        window.open(environment.applink + '/activitylog?accnumber=' + this.cardacct + '&custnumber=' + this.cardacct + '&username=' + this.currentUser.username + '&sys=cc', '_blank');
    };
    LoansComponent.prototype.ngOnInit = function () {
    };
    LoansComponent.prototype.filterfunction = function (column, value) {
        console.log(column, value);
    };
    __decorate([
        ViewChild('myGrid'),
        __metadata("design:type", jqxGridComponent)
    ], LoansComponent.prototype, "myGrid", void 0);
    LoansComponent = __decorate([
        Component({
            selector: 'app-loans',
            templateUrl: './loans.component.html',
            styleUrls: ['./loans.component.scss']
        }),
        __metadata("design:paramtypes", [JqxDomService, EcolService])
    ], LoansComponent);
    return LoansComponent;
}());
export { LoansComponent };
//# sourceMappingURL=loans.component.js.map