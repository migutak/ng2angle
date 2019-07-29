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
import { environment } from '../../../../../environments/environment';
import * as $ from 'jquery';
import { EcolService } from '../../../../services/ecol.service';
var DemandsdueComponent = /** @class */ (function () {
    function DemandsdueComponent(ecolService, http) {
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
                field: 'cardacct',
                cellRenderer: function (params) {
                    return '<a  href="#" target="_blank">' + params.value + '</a>';
                }
            },
            {
                headerName: 'CARDNUMBER',
                field: 'cardnumber'
            },
            {
                headerName: 'CARDNAME',
                field: 'cardname'
            },
            {
                headerName: 'DAYSINARREARS',
                field: 'daysinarrears',
                cellStyle: function (params) {
                    if (params.value < '30') {
                        return { color: 'red' };
                    }
                    else if (params.value > '90') {
                        return { color: 'red' };
                    }
                    else {
                        return null;
                    }
                }
            },
            {
                headerName: 'EXPPMNT',
                field: 'exppmnt',
                valueFormatter: this.currencyFormatter
            },
            {
                headerName: 'OUTBALANCE',
                field: 'outbalance',
                valueFormatter: this.currencyFormatter
            },
            {
                headerName: 'DEMANDLETTER',
                field: 'demandletter'
            },
            {
                headerName: 'SQNUMBER',
                field: 'sqnumber'
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
    DemandsdueComponent.prototype.currencyFormatter = function (params) {
        return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
    DemandsdueComponent.prototype.formatNumber = function (number) {
        // this puts commas into the number eg 1000 goes to 1,000,
        // i pulled this from stack overflow, i have no idea how it works
        return Math.floor(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
    DemandsdueComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink + '/sendlettercc?cardacct=' + this.model.cardacct + '&username=' + this.username, '_blank');
    };
    DemandsdueComponent.prototype.onQuickFilterChanged = function ($event) {
        // this.gridOptions.api.setQuickFilter($event.target.value);
        this.searchText = $event.target.value;
    };
    DemandsdueComponent.prototype.onSearch = function () {
        var _this = this;
        if (this.model.searchText === undefined) {
            return;
        }
        this.clear();
        this.http.get(environment.api + '/api/demandsduecc/search?searchtext=' + this.model.searchText).subscribe(function (resp) {
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
        this.ecolService.totalcardsdue().subscribe(function (cards) {
            _this.noTotal = cards[0].TOTALVIEWALL;
        });
    };
    DemandsdueComponent.prototype.gridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    DemandsdueComponent.prototype.apiService = function (perPage, currentPos) {
        return this.http.get(environment.api + '/api/demandsduecc?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
    };
    DemandsdueComponent = __decorate([
        Component({
            selector: 'app-demandsdue',
            templateUrl: './demandsdue.component.html',
            styleUrls: ['./demandsdue.component.scss']
        })
        /*
        import { Component, OnInit, ViewChild } from '@angular/core';
        import { JqxDomService } from '../../../../shared/jqwidgets-dom.service';
        import { HttpClient, HttpHeaders } from '@angular/common/http';
        import { environment } from '../../../../../environments/environment';
        import * as $ from 'jquery';
        import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
        import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
        import { EcolService } from '../../../../services/ecol.service';
        
        @Component({
          selector: 'app-demandsdue',
          templateUrl: './demandsdue.component.html',
          styleUrls: ['./demandsdue.component.scss']
        })
        export class DemandsdueComponent implements OnInit {
        
          @ViewChild('myModal') myModal;
          @ViewChild('myGrid') myGrid: jqxGridComponent;
          public radioModel: string;
        
          total:  any = {};
          user = JSON.parse(localStorage.getItem('currentUser'));
          constructor(private jqxDomService: JqxDomService, private ecolService: EcolService) {
        
          }
        
          source: any =
            {
              url: environment.api + '/api/demandsduecc?filter[status]=PENDING&filter[limit]=150',
              datafields:
                [
                  { name: 'cardacct', type: 'string' },
                  { name: 'cardnumber', type: 'string' },
                  { name: 'cardname', type: 'string' },
                  { name: 'outbalance', type: 'number' },
                  { name: 'exppmnt', type: 'number' },
                  { name: 'daysinarrears', type: 'number' },
                  { name: 'address', type: 'string' },
                  { name: 'rpcode', type: 'string' },
                  { name: 'city', type: 'string' },
                  { name: 'mobile', type: 'string' },
                  { name: 'emailaddress', type: 'string' },
                  { name: 'colofficer', type: 'string' },
                  { name: 'demandletter', type: 'string' },
                  { name: 'datedue', type: 'string' },
                  { name: 'status', type: 'string' }
                ],
              datatype: 'json'
            };
        
          dataAdapter: any = new jqx.dataAdapter(this.source);
        
          columns: any[] =
            [
              {
                text: 'CARDACCT', datafield: 'cardacct', width: 150, filtertype: 'input',
                createwidget: (row: number, column: any, value: string, htmlElement: HTMLElement, rowdata): void => {
                  const that = this;
                  const container = document.createElement('div');
                  htmlElement.appendChild(container);
                  const result = this.jqxDomService.loadComponent(jqxButtonComponent, container);
                  (<jqxButtonComponent>result.componentRef.instance).autoCreate = false;
                  // tslint:disable-next-line:no-shadowed-variable
                  (<jqxButtonComponent>result.componentRef.instance).onClick.subscribe((clickEvent, rowdata) => {
                    that.onClickMe(clickEvent, rowdata);
                  });
                  (<jqxButtonComponent>result.componentRef.instance).createComponent({ value: value, width: 150, height: 30 });
                },
                initwidget: (row: number, column: any, value: any, htmlElement: HTMLElement): void => { }
              },
              { text: 'CARDNUMBER', datafield: 'cardnumber', width: 100, filtertype: 'input' },
              { text: 'CARDNAME', datafield: 'cardname', width: 150, filtertype: 'input' },
              { text: 'OUTBALANCE', datafield: 'outbalance', filtertype: 'input', cellsformat: 'd' },
              { text: 'EXPPMNT', datafield: 'exppmnt', filtertype: 'input', cellsformat: 'd' },
              { text: 'DAYSINARR', datafield: 'daysinarrears', filtertype: 'input', cellsformat: 'd' },
              { text: 'TELNUMBER', datafield: 'mobile', filtertype: 'input' },
              { text: 'EMAILADDRESS', datafield: 'emailaddress', filtertype: 'input' },
              { text: 'COLOFFICER', datafield: 'colofficer', filtertype: 'input' },
              { text: 'DEMANDLETTER', datafield: 'demandletter', filtertype: 'input' },
              { text: 'DATEDUE', datafield: 'datedue', filtertype: 'input' },
              { text: 'STATUS', datafield: 'status', filtertype: 'input' }
        
            ];
        
            cardacct: String;
          onClickMe(event, rowdata) {
            this.cardacct = event.target.textContent;
            // open page
            window.open(environment.applink + '/sendlettercc?cardacct=' + this.cardacct + '&username=' + this.user.username, '_blank');
          }
        
          ngOnInit() {
          }
        
          filterfunction (column, value) {
            console.log(column, value);
          }
        
          refreshgrid() {
          this.source.url = environment.api + '/api/demandsduecc?filter[where][demandletter]='
           + this.radioModel.toUpperCase() + '&filter[limit]=150',
        
          // console.log(this.source.url, this.dataAdapter);
          // tslint:disable-next-line:max-line-length
          //
          this.myGrid.updatebounddata('cells');
          }
        
        
        }*/
        ,
        __metadata("design:paramtypes", [EcolService, HttpClient])
    ], DemandsdueComponent);
    return DemandsdueComponent;
}());
export { DemandsdueComponent };
//# sourceMappingURL=demandsdue.component.js.map