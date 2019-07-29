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
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
var CustomerSuspensionsComponent = /** @class */ (function () {
    function CustomerSuspensionsComponent(ecolService, route, spinner, http) {
        var _this = this;
        this.ecolService = ecolService;
        this.route = route;
        this.spinner = spinner;
        this.resizeEvent = 'resize.ag-grid';
        this.$win = $(window);
        this.new = true;
        this.columnDefs = [
            /*{
              headerName: '',
              field: 'memogroup',
              cellRenderer: params => {
                return `<input type='checkbox' ${params.value ? 'checked' : 'true'} />`
              }
            },*/
            {
                headerName: 'Custnumber',
                field: 'custnumber',
                width: 90
            }, {
                headerName: 'demand1',
                field: 'demand1',
                width: 90
            }, {
                headerName: 'demand2',
                field: 'demand2',
                width: 90
            }, {
                headerName: 'prelisting',
                field: 'prelisting',
                width: 90
            }, {
                headerName: 'overduecc',
                field: 'overduecc',
                width: 100
            }, {
                headerName: 'prelistingcc',
                field: 'prelistingcc',
                width: 90
            }, {
                headerName: 'suspension',
                field: 'suspension',
                width: 90
            },
            /*{
              headerName: 'PostlistingUnsecuredcc',
              field: 'PostlistingUnsecuredcc',
              width: 100
            }, {
              headerName: 'PostlistingSecured',
              field: 'PostlistingSecured',
              width: 90
            }, {
              headerName: 'PostlistingUnsecured',
              field: 'PostlistingUnsecured',
              width: 90
            }, {
              headerName: 'Day90',
              field: 'Day90',
              width: 100
            }, {
              headerName: 'Day40',
              field: 'Day40',
              width: 90
            }, {
              headerName: 'Day30',
              field: 'Day30',
              width: 90
            },*/
            {
                headerName: 'prelistingremedial',
                field: 'prelistingremedial',
                width: 100
            }
        ];
        this.postModel = {};
        this.postBody = [];
        // tslint:disable-next-line:max-line-length
        this.itemsDemands = ['demand1', 'demand2', 'prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'Day90', 'Day40', 'Day30',
            'prelistingremedial', 'overduecc', 'prelistingcc', 'suspension', 'PostlistingUnsecuredcc'];
        this.model = {};
        this.gridOptions = {
            headerHeight: 40,
            columnDefs: this.columnDefs,
            rowData: null,
            enableFilter: true,
            rowSelection: 'single',
        };
        http.get(environment.api + '/api/customersuspensions').subscribe(function (resp) {
            _this.rowData1 = resp;
        });
    }
    CustomerSuspensionsComponent.prototype.onQuickFilterChanged = function ($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    };
    CustomerSuspensionsComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.model.owner = currentUser.username;
    };
    CustomerSuspensionsComponent.prototype.gridReady = function (params) {
        params.api.sizeColumnsToFit();
        this.$win.on(this.resizeEvent, function () {
            setTimeout(function () { params.api.sizeColumnsToFit(); });
        });
    };
    CustomerSuspensionsComponent.prototype.putSuspension = function (form) {
        var _this = this;
        console.log(form);
        this.spinner.show();
        this.ecolService.putcustomersuspensions(form).subscribe(function (cust) {
            swal('Success!', 'Update successful!', 'success');
            _this.getData();
            _this.spinner.hide();
        }, function (error) {
            console.log(error);
        });
    };
    CustomerSuspensionsComponent.prototype.getData = function () {
        var _this = this;
        this.ecolService.getcustomersuspensions().subscribe(function (res) {
            _this.rowData1 = res;
        });
    };
    CustomerSuspensionsComponent.prototype.onRowClicked = function (event) {
        this.model.custnumber = event.node.data.custnumber;
        this.model.demand1 = event.node.data.demand1 === 'true' ? true : false;
        this.model.demand2 = event.node.data.demand2 === 'true' ? true : false;
        this.model.prelisting = event.node.data.prelisting === 'true' ? true : false;
        this.model.overduecc = event.node.data.overduecc === 'true' ? true : false;
        this.model.prelistingcc = event.node.data.prelistingcc === 'true' ? true : false;
        this.model.prelistingremedial = event.node.data.prelistingremedial === 'true' ? true : false;
        this.model.day30 = event.node.data.day30 === 'true' ? true : false;
        this.model.day40 = event.node.data.day40 === 'true' ? true : false;
        this.model.day90 = event.node.data.day90 === 'true' ? true : false;
        this.model.suspension = event.node.data.suspension === 'true' ? true : false;
        this.model.postlistingsecured = event.node.data.postlistingsecured === 'true' ? true : false;
        this.model.postlistingunsecured = event.node.data.postlistingunsecured === 'true' ? true : false;
        this.model.postlistingunsecuredcc = event.node.data.postlistingunsecuredcc === 'true' ? true : false;
    };
    CustomerSuspensionsComponent = __decorate([
        Component({
            selector: 'app-customersuspensions',
            templateUrl: './customersuspensions.component.html',
            styleUrls: ['./customersuspensions.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService,
            ActivatedRoute,
            NgxSpinnerService,
            HttpClient])
    ], CustomerSuspensionsComponent);
    return CustomerSuspensionsComponent;
}());
export { CustomerSuspensionsComponent };
//# sourceMappingURL=customersuspensions.component.js.map