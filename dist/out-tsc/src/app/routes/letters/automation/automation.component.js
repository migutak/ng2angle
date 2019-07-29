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
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
var AutomationComponent = /** @class */ (function () {
    function AutomationComponent(ecolService, route, spinner, http) {
        var _this = this;
        this.ecolService = ecolService;
        this.route = route;
        this.spinner = spinner;
        this.resizeEvent = 'resize.ag-grid';
        this.$win = $(window);
        this.new = true;
        this.memos = [];
        // Basic example
        this.columnDefs = [
            /*{
              headerName: '',
              field: 'memogroup',
              cellRenderer: params => {
                return `<input type='checkbox' ${params.value ? 'checked' : 'true'} />`
              }
            },*/
            {
                headerName: 'Memo Group',
                field: 'memogroup',
                width: 150
            }, {
                headerName: 'Demand Letter',
                field: 'letterid',
                width: 120
            }, {
                headerName: 'Daysinarr',
                field: 'daysinarr',
                width: 90
            }, {
                headerName: 'Lastupdateby',
                field: 'lastupdateby',
                width: 90
            }, {
                headerName: 'Lastupdate',
                field: 'lastupdate',
                width: 100
            }
        ];
        this.postModel = {};
        this.postBody = [];
        // tslint:disable-next-line:max-line-length
        this.itemsDemands = ['demand1', 'demand2', 'prelisting', 'PostlistingSecured', 'PostlistingUnsecured', 'Day90', 'Day40', 'Day30',
            'prelistingremedial', 'overduecc', 'prelistingcc', 'suspension', 'PostlistingUnsecuredcc'];
        // public items: Array<string> = [];
        this.items = ['07', '09', '100', '102', '103', '105', '106', '108', '109', '11',
            '111', '112', '113', '114', '116', '117', '118', '120', '121', '122', '123', '124',
            '125',
            '126',
            '127',
            '128',
            '129',
            '13', '130', '131', '132', '134', '135', '136',
            '137',
            '138',
            '139',
            '14',
            '141',
            '142',
            '143',
            '145',
            '146',
            '147',
            '148',
            '149',
            '150',
            '154',
            '16',
            '161',
            '17',
            '175',
            '190',
            '191',
            '192',
            '23',
            '24',
            '240',
            '241',
            '244',
            '245',
            '246',
            '247',
            '248',
            '249',
            '25',
            '281',
            '600',
            '601',
            '602',
            '603',
            '604',
            '605',
            '606',
            '607',
            '608',
            '609',
            '611',
            '612',
            '613',
            '614',
            '616',
            '617',
            '618',
            '619',
            '620',
            '621',
            '622',
            '623',
            '626',
            '627',
            '629',
            '630',
            '631',
            '633',
            '634',
            '635',
            '637',
            '638',
            '639',
            '641',
            '642',
            '644',
            '647',
            '648',
            '649',
            '650',
            '651',
            '652',
            '653',
            '654',
            '655',
            '656',
            '657',
            '658',
            '661',
            '667',
            '670',
            '671',
            '672',
            '673',
            '674',
            '675',
            '676',
            '677',
            '678',
            '679',
            '680',
            '683',
            '689',
            '690',
            '691',
            '692',
            '694',
            '698',
            '6A0',
            '6A8',
            '6B0',
            '6B3',
            '6B7',
            '6B8',
            '6B9',
            '6C3',
            '6C4',
            '6C7',
            '6C8',
            '6D0',
            '6D1',
            '6D3',
            '6D5',
            '6E1',
            '6E2',
            '6E3',
            '6E6',
            '6E7',
            '6F2',
            '6F3',
            '6F4',
            '6F6',
            '6F7',
            '6F9',
            '6FA',
            '6G0',
            '6G1',
            '6G2',
            '6G3',
            '6G4',
            '6G5',
            '6G6',
            '6G7',
            '6G9',
            '6GA',
            '6H0',
            '6H1',
            '6H2',
            '6J0',
            '6J1',
            '6J2',
            '6J3',
            '6J5',
            '6J6',
            '6J8',
            '6K3',
            '6K4',
            '6K6',
            '6K9',
            '6L1',
            '6L2',
            '6L4',
            '6L5',
            '6L7',
            '6L8',
            '6L9',
            '6M0',
            '6M1',
            '6M2',
            '6M3',
            '6M4',
            '6M5',
            '6M6',
            '6M7',
            '6M8',
            '6M9',
            '6MA',
            '6N1',
            '6N3',
            '6N6',
            '6N7',
            '6N8',
            '6N9',
            '6P0',
            '6P1',
            '6P4',
            '6P5',
            '6P6',
            '6P8',
            '6P9',
            '700',
            '704',
            '705',
            '706',
            '723',
            '737',
            '744',
            '784',
            '789',
            '792',
            '793',
            '794',
            '796',
            '797',
            '798',
            '7A0',
            '7A3',
            '7A4',
            '7A5',
            '7B0',
            '7B1',
            '7M3',
            '7N7',
            '9D3',
            '9E7',
            '9E9',
            '9J3',
            '9J4',
            '9J5',
            '9J6',
            '9J8',
            '9J9',
            '9K1',
            '9K2',
            '9K3',
            '9K4',
            'T22'];
        this.model = {};
        // Basic example
        this.gridOptions = {
            headerHeight: 40,
            columnDefs: this.columnDefs,
            rowData: null,
            enableFilter: true,
            rowSelection: 'single',
        };
        http.get(environment.api + '/api/autoletters').subscribe(function (resp) {
            _this.rowData1 = resp;
        });
    }
    AutomationComponent.prototype.onRowClicked = function (event) {
        this.new = false;
        this.model = event.node.data;
        this.model.lastupdateby = this.username;
        this.model.lastupdate = new Date();
        this.model.active = (event.node.data.active).toLowerCase() === 'true' ? true : false;
    };
    AutomationComponent.prototype.onQuickFilterChanged = function ($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    };
    AutomationComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        // get memos
        // this.getMemos();
    };
    AutomationComponent.prototype.gridReady = function (params) {
        params.api.sizeColumnsToFit();
        this.$win.on(this.resizeEvent, function () {
            setTimeout(function () { params.api.sizeColumnsToFit(); });
        });
    };
    AutomationComponent.prototype.shownew = function () {
        this.new = true;
        this.model = {};
    };
    AutomationComponent.prototype.fneditSubmit = function (form) {
        var _this = this;
        this.spinner.show();
        this.ecolService.putautoLetter(this.model).subscribe(function (resp) {
            swal('Success!', 'Update successful!', 'success');
            _this.getData();
            _this.spinner.hide();
        }, function (error) {
            console.log(error);
            swal('Eror!', 'Update was not completed!', 'error');
            _this.spinner.hide();
        });
    };
    AutomationComponent.prototype.getData = function () {
        var _this = this;
        this.ecolService.getautoLetter().subscribe(function (res) {
            _this.rowData1 = res;
        });
    };
    AutomationComponent.prototype.getMemos = function () {
        var _this = this;
        this.ecolService.getmemo().subscribe(function (res) {
            console.log(res.length);
            _this.memos = res;
            for (var i = 0; i <= 253; i++) {
                _this.items.push(res[i].memo);
            }
            console.log('Array==>', _this.items);
        });
    };
    // postautoLetter
    AutomationComponent.prototype.addNew = function (form) {
        var _this = this;
        var body = {
            'letterid': form.value.letterid,
            'memogroup': form.value.memogroup,
            'daysinarr': form.value.daysinarr,
            'lastupdate': new Date(),
            'lastupdateby': this.username,
            'active': true
        };
        // check duplicate
        this.ecolService.postcheckautoLetter(body).subscribe(function (resp) {
            //
            var reject = false;
            var acceptModel = [];
            var rejectModel = [];
            for (var i = 0; i < resp.length; i++) {
                if (resp[i].isduplicate === true) {
                    // add to reject
                    reject = true;
                    rejectModel[i] = resp[i];
                }
                else {
                    acceptModel[i] = resp[i];
                }
            }
            if (reject) {
                // reject request
                swal('Error!', 'Request contains duplicates!', 'error');
                swal({
                    type: 'error',
                    title: 'Duplicates detected...',
                    text: JSON.stringify(rejectModel),
                    footer: '<a href>Find help on this issue?</a>'
                });
            }
            else {
                // acccepts and post
                _this.spinner.show();
                _this.ecolService.postautoLetter(acceptModel).subscribe(function (data) {
                    swal('Success!', 'Successfully added!', 'success');
                    _this.spinner.hide();
                    _this.getData();
                });
            }
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error occurred during processing!', 'error');
        });
    };
    AutomationComponent.prototype.editSubmit = function (form) {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'You want to Update!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update!'
        }).then(function (result) {
            if (result.value) {
                _this.fneditSubmit(form);
            }
        });
    };
    AutomationComponent.prototype.delete = function () {
        swal({
            title: 'Are you sure?',
            text: 'You want to DELETE!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        }).then(function (result) {
            if (result.value) {
                //
            }
        });
    };
    AutomationComponent = __decorate([
        Component({
            selector: 'app-automation',
            templateUrl: './automation.component.html',
            styleUrls: ['./automation.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService,
            ActivatedRoute,
            NgxSpinnerService,
            HttpClient])
    ], AutomationComponent);
    return AutomationComponent;
}());
export { AutomationComponent };
//# sourceMappingURL=automation.component.js.map