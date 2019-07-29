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
var Demand1Component = /** @class */ (function () {
    function Demand1Component(jqxDomService, ecolService) {
        var _this = this;
        this.jqxDomService = jqxDomService;
        this.ecolService = ecolService;
        this.total = {};
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.source = {
            url: environment.api + '/api/demandsdue?filter[status]=PENDING&filter[limit]=150',
            datafields: [
                { name: 'accnumber', type: 'string' },
                { name: 'custnumber', type: 'string' },
                { name: 'client_name', type: 'string' },
                { name: 'oustbalance', type: 'number' },
                { name: 'totalarrears', type: 'number' },
                { name: 'daysinarr', type: 'number' },
                { name: 'address', type: 'string' },
                { name: 'postalcode', type: 'string' },
                { name: 'section', type: 'string' },
                { name: 'telnumber', type: 'string' },
                { name: 'emailaddress', type: 'string' },
                { name: 'colofficer', type: 'string' },
                { name: 'demandletter', type: 'string' },
                { name: 'datedue', type: 'string' },
                { name: 'status', type: 'string' }
            ],
            datatype: 'json'
        };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.columns = [
            {
                text: 'ACCNUMBER', datafield: 'accnumber', width: 150, filtertype: 'input',
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
            { text: 'CUSTNUMBER', datafield: 'custnumber', width: 100, filtertype: 'input' },
            { text: 'CLIENT_NAME', datafield: 'client_name', width: 200, filtertype: 'input' },
            { text: 'OUSTBALANCE', datafield: 'oustbalance', filtertype: 'input', cellsformat: 'd' },
            { text: 'TOTALARREARS', datafield: 'totalarrears', filtertype: 'input', cellsformat: 'd' },
            { text: 'DAYSINARR', datafield: 'daysinarr', filtertype: 'input', cellsformat: 'd' },
            { text: 'SECTION', datafield: 'section', filtertype: 'input' },
            { text: 'BRANCHNAME', datafield: 'branchname', filtertype: 'input' },
            { text: 'TELNUMBER', datafield: 'telnumber', filtertype: 'input' },
            { text: 'EMAILADDRESS', datafield: 'emailaddress', filtertype: 'input' },
            { text: 'COLOFFICER', datafield: 'colofficer', filtertype: 'input' },
            { text: 'DEMANDLETTER', datafield: 'demandletter', filtertype: 'input' },
            { text: 'DATEDUE', datafield: 'datedue', filtertype: 'input' },
            { text: 'STATUS', datafield: 'status', filtertype: 'input' }
        ];
    }
    Demand1Component.prototype.onClickMe = function (event, rowdata) {
        this.accnumber = event.target.textContent;
        this.custnumber = (event.target.textContent).slice(5, 12);
        // tslint:disable-next-line:max-line-length
        // console.log('this row', this.rowValue);
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink + '/sendletter?accnumber=' + this.accnumber + '&custnumber=' + this.custnumber + '&username=' + this.user.username, '_blank');
    };
    Demand1Component.prototype.myGridOnRowSelect = function (event) {
        var args = event.args;
        var selectedRowIndex = args.rowindex;
        var value = this.myGrid.getrowdata(selectedRowIndex);
        this.rowValue = value;
    };
    Demand1Component.prototype.myGridOnCellSelect = function (event) {
        var args = event.args;
        var selectedRowIndex = args.rowindex;
        var value = this.myGrid.getrowdata(selectedRowIndex);
        this.rowValue = value;
        // console.log('myGridOnCellSelect', value);
    };
    Demand1Component.prototype.ngOnInit = function () {
        // get total for badges
        this.gettotals();
    };
    Demand1Component.prototype.filterfunction = function (column, value) {
        console.log(column, value);
    };
    Demand1Component.prototype.refreshgrid = function () {
        this.source.url = environment.api + '/api/demandsdue?filter[where][demandletter]=' + this.radioModel.toUpperCase() + '&filter[limit]=150',
            this.myGrid.updatebounddata('cells');
    };
    Demand1Component.prototype.gettotal = function (column, value, letter) {
        var _this = this;
        this.ecolService.gettotalletters(column, value, letter).subscribe(function (data) {
            if (data.length > 0) {
                _this.total.DEMAND1 = data[0].TOTAL;
            }
        }, function (error) {
            console.log(error);
        });
    };
    Demand1Component.prototype.gettotal1 = function (column, value, letter) {
        var _this = this;
        this.ecolService.gettotalletters(column, value, letter).subscribe(function (data) {
            if (data.length > 0) {
                _this.total.DEMAND2 = data[0].TOTAL;
            }
        }, function (error) {
            console.log(error);
        });
    };
    Demand1Component.prototype.gettotal2 = function (column, value, letter) {
        var _this = this;
        this.ecolService.gettotalletters(column, value, letter).subscribe(function (data) {
            if (data.length > 0) {
                _this.total.PRELISTING = data[0].TOTAL;
            }
        }, function (error) {
            console.log(error);
        });
    };
    Demand1Component.prototype.gettotal3 = function (column, value, letter) {
        var _this = this;
        this.ecolService.gettotalletters(column, value, letter).subscribe(function (data) {
            if (data.length > 0) {
                _this.total.POSTLISTING = data[0].TOTAL;
            }
        }, function (error) {
            console.log(error);
        });
    };
    Demand1Component.prototype.gettotal4 = function (column, value, letter) {
        var _this = this;
        this.ecolService.gettotalletters(column, value, letter).subscribe(function (data) {
            if (data.length > 0) {
                _this.total.DAY40 = data[0].TOTAL;
            }
        }, function (error) {
            console.log(error);
        });
    };
    Demand1Component.prototype.gettotal5 = function (column, value, letter) {
        var _this = this;
        this.ecolService.gettotalletters(column, value, letter).subscribe(function (data) {
            if (data.length > 0) {
                _this.total.DAY90 = data[0].TOTAL;
            }
        }, function (error) {
            console.log(error);
        });
    };
    Demand1Component.prototype.gettotals = function () {
        this.gettotal(null, null, 'DEMAND1');
        this.gettotal1(null, null, 'DEMAND2');
        this.gettotal2(null, null, 'PRELISTING');
        this.gettotal3(null, null, 'POSTLISTING');
        this.gettotal4(null, null, 'DAY40');
        this.gettotal5(null, null, 'DAY90');
    };
    __decorate([
        ViewChild('myModal'),
        __metadata("design:type", Object)
    ], Demand1Component.prototype, "myModal", void 0);
    __decorate([
        ViewChild('myGrid'),
        __metadata("design:type", jqxGridComponent)
    ], Demand1Component.prototype, "myGrid", void 0);
    Demand1Component = __decorate([
        Component({
            selector: 'app-demand1',
            templateUrl: './demand1.component.html',
            styleUrls: ['./demand1.component.scss']
        }),
        __metadata("design:paramtypes", [JqxDomService, EcolService])
    ], Demand1Component);
    return Demand1Component;
}());
export { Demand1Component };
//# sourceMappingURL=demand1.component.js.map