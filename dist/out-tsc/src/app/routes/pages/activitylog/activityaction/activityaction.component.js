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
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import { DataService } from '../../../../services/data.service';
import swal from 'sweetalert2';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
var URL = environment.valor;
var ActivityActionComponent = /** @class */ (function () {
    function ActivityActionComponent(settings, route, router, formBuilder, ecolService, dataService, spinner) {
        this.settings = settings;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.ecolService = ecolService;
        this.dataService = dataService;
        this.spinner = spinner;
        this.bsValue = new Date();
        this.model = {};
        this.bodyletter = {};
        this.submitted = false;
        this.cmdstatus = [];
        this.party = [];
        this.cure = [];
        this.excuse = [];
        this.collectoraction = [
            { collectoractionid: 'OC', collectoraction: 'OUTGOING CALL' },
            { collectoractionid: 'IC', collectoraction: 'INCOMING CALL' },
            { collectoractionid: 'MET', collectoraction: 'DEBTOR VISITED' },
            { collectoractionid: 'REVW', collectoraction: 'ACCOUNT REVIEW' },
            { collectoractionid: 'SC', collectoraction: 'SENT CORRESPONDENCE' },
            { collectoractionid: 'RC', collectoraction: 'RECEIVED CORRESPONDENCE' },
            { collectoractionid: 'RR', collectoraction: 'ROUTE FOR REVIEW' },
            { collectoractionid: 'OA', collectoraction: 'ASSIGN OUTSIDE AGENCY' },
            { collectoractionid: 'RF', collectoraction: 'RECEIVED FILE' },
            { collectoractionid: 'FT', collectoraction: 'FUND TRANSFER' },
            { collectoractionid: 'NFA', collectoraction: 'NEW FILE ALLOCATION' }
        ];
        this.reviewers = [];
        this.account = [];
        this.sys = 'collections';
        this.ptp = [
            { id: 'No', name: 'No' },
            { id: 'Yes', name: 'Yes' },
        ];
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate() - 1);
    }
    ActivityActionComponent.prototype.currentDate = function () {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        return day + '-' + month + '-' + year;
    };
    ActivityActionComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.spinner.show();
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
        });
        /*this.username = this.route.snapshot.queryParamMap.get('username');
        this.route.queryParamMap.subscribe(queryParams => {
          this.username = queryParams.get('username');
        });*/
        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.custnumber = queryParams.get('custnumber');
        });
        this.sys = this.route.snapshot.queryParamMap.get('sys');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.sys = queryParams.get('sys');
        });
        // build form
        this.buildForm();
        //
        this.getcmdstatus();
        this.getreviewers();
        this.getparty();
        // this.getcollectoraction();
        this.getexcuse();
        //
        if (this.sys === 'cc') {
            this.getcard(this.accnumber);
        }
        else if (this.sys === 'watchcc') {
            this.getwatchcard(this.accnumber);
        }
        else if (this.sys === 'mcoopcash') {
            this.getmcoop(this.accnumber);
        }
        else if (this.sys === 'watch') {
            this.getwatch(this.accnumber);
        }
        else {
            this.getaccount(this.accnumber);
        }
    };
    ActivityActionComponent.prototype.getaccount = function (accnumber) {
        var _this = this;
        this.ecolService.getAccount(accnumber).subscribe(function (data) {
            _this.account = data[0];
            // build form
            _this.buildForm();
            if (swal.isVisible) {
                swal.close();
            }
            _this.spinner.hide();
        });
    };
    ActivityActionComponent.prototype.getwatch = function (accnumber) {
        var _this = this;
        this.ecolService.getwatch(accnumber).subscribe(function (data) {
            _this.account = data;
            if (data.watch) {
                _this.account.reviewdate = data.watch.reviewdate || '',
                    _this.account.excuse = data.watch.excuse || '',
                    _this.account.cmdstatus = data.watch.cmdstatus || 'Hardcore',
                    _this.account.routetostate = data.watch.routetostate || 'ACTIVE COLLECTIONS',
                    _this.account.excuse_other = data.watch.rfdother;
            }
            // build form
            _this.buildForm();
            if (swal.isVisible) {
                swal.close();
            }
            _this.spinner.hide();
        });
    };
    ActivityActionComponent.prototype.getwatchcard = function (cardacct) {
        var _this = this;
        this.ecolService.getWatchcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
            _this.getwatchcardstatic(cardacct);
        });
    };
    ActivityActionComponent.prototype.getwatchcardstatic = function (cardacct) {
        var _this = this;
        this.ecolService.getWatchcardStatic(cardacct).subscribe(function (data) {
            if (data && data.length > 0) {
                _this.account.reviewdate = data[0].reviewdate;
                _this.account.excuse = data[0].excuse;
                _this.account.cmdstatus = data[0].cmdstatus;
                _this.account.routetostate = data[0].routetostate;
                _this.account.excuse_other = data[0].rfdother;
            }
            // build form
            _this.buildForm();
            if (swal.isVisible) {
                swal.close();
            }
            _this.spinner.hide();
        });
    };
    ActivityActionComponent.prototype.getcard = function (cardacct) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
            // build form
            _this.buildForm();
            if (swal.isVisible) {
                swal.close();
            }
            _this.spinner.hide();
        });
    };
    ActivityActionComponent.prototype.getmcoop = function (loanaccnumber) {
        var _this = this;
        this.ecolService.getmcoopcashAccount(loanaccnumber).subscribe(function (data) {
            _this.account = data[0];
            _this.spinner.hide();
        });
    };
    ActivityActionComponent.prototype.getcmdstatus = function () {
        var _this = this;
        this.ecolService.getcmdstatus().subscribe(function (cmdstatus) {
            _this.cmdstatus = cmdstatus;
        });
    };
    ActivityActionComponent.prototype.getreviewers = function () {
        var _this = this;
        this.ecolService.getreviewers().subscribe(function (data) {
            _this.reviewers = data;
        });
    };
    ActivityActionComponent.prototype.getparty = function () {
        var _this = this;
        this.ecolService.getparty().subscribe(function (party) {
            _this.party = party;
        });
    };
    ActivityActionComponent.prototype.getcollectoraction = function () {
        var _this = this;
        this.ecolService.getcollectoraction().subscribe(function (collectoraction) {
            _this.collectoraction = collectoraction;
        });
    };
    ActivityActionComponent.prototype.getexcuse = function () {
        var _this = this;
        this.ecolService.getexcuse().subscribe(function (excuse) {
            _this.excuse = excuse;
        });
    };
    ActivityActionComponent.prototype.getcure = function () {
        var _this = this;
        this.ecolService.getcure().subscribe(function (cure) {
            _this.cure = cure;
        });
    };
    Object.defineProperty(ActivityActionComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.actionForm.controls; },
        enumerable: true,
        configurable: true
    });
    ActivityActionComponent.prototype.buildForm = function () {
        // get static data
        this.actionForm = this.formBuilder.group({
            collectoraction: ['', Validators.required],
            party: [{ value: '', disabled: true }],
            ptpamount: [{ value: 0, disabled: true }],
            ptp: [{ value: 'No', disabled: true }],
            ptpdate: [{ value: this.currentDate, disabled: true }],
            collectornote: ['', [Validators.required, Validators.minLength(5)]],
            reviewdate: [this.account.reviewdate],
            reason: [this.account.excuse, Validators.required],
            cmdstatus: [this.account.cmdstatus, Validators.required],
            // branchstatus: [this.account.branchstatus],
            route: [this.account.routetostate],
            paymode: [''],
            rfdother: [{ value: this.account.excuse_other, disabled: true }]
        });
    };
    ActivityActionComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.actionForm.invalid) {
            alert('Please fill all required fields');
            return;
        }
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        // post data
        this.ecolService.loader();
        var body = {
            collectoraction: this.f.collectoraction.value,
            party: this.f.party.value,
            ptpamount: this.f.ptpamount.value,
            ptp: this.f.ptp.value,
            ptpdate: this.f.ptpdate.value,
            collectornote: this.f.collectornote.value,
            reviewdate: moment(this.f.reviewdate.value).format('DD-MMM-YYYY'),
            reason: this.f.reason.value,
            cmdstatus: this.f.cmdstatus.value,
            route: this.f.route.value,
            paymode: this.f.paymode.value,
            accountnumber: this.accnumber,
            custnumber: this.custnumber,
            arramount: this.account.totalarrears || 0,
            oustamount: this.account.oustbalance || 0,
            notesrc: 'made a note',
            noteimp: 'N',
            rfdother: this.f.rfdother.value,
            owner: this.username,
            product: this.account.section
        };
        // add action
        this.ecolService.postactivitylogs(body).subscribe(function (data) {
            _this.sendNotesData(_this.custnumber);
            swal('Success!', 'activity saved', 'success');
            // build form
            // this.buildForm();
            // watch stream put watch_static
            if (_this.sys === 'watchcc') {
                var watchccbody = {
                    rfdother: _this.f.rfdother.value,
                    cardacct: _this.accnumber,
                    cmdstatus: _this.f.cmdstatus.value,
                    excuse: _this.f.reason.value,
                    lastactiondate: new Date(),
                    reviewdate: moment(_this.f.reviewdate.value).format('DD-MMM-YYYY'),
                    routetostate: _this.f.route.value
                };
                _this.ecolService.putcardwatch(watchccbody).subscribe(function (resp) {
                    //
                }, function (error) { console.log(error); });
            }
            //
            if (_this.sys === 'watch') {
                var watchbody = {
                    rfdother: _this.f.rfdother.value,
                    accnumber: _this.accnumber,
                    cmdstatus: _this.f.cmdstatus.value,
                    excuse: _this.f.reason.value,
                    lastactiondate: new Date(),
                    reviewdate: moment(_this.f.reviewdate.value).format('DD-MMM-YYYY'),
                    routetostate: _this.f.route.value
                };
                _this.ecolService.putwatch(watchbody).subscribe(function (resp) {
                    //
                }, function (error) { console.log(error); });
            }
        }, function (error) {
            console.log(error);
            swal('Error!', 'activitylog ::: service is currently not available', 'error');
        });
    };
    ActivityActionComponent.prototype.sendNotesData = function (custnumber) {
        var _this = this;
        this.ecolService.totalnotes(custnumber).subscribe(function (data) {
            _this.dataService.pustNotesData(data[0].TOTAL);
        });
    };
    ActivityActionComponent.prototype.reset = function () {
        this.spinner.show();
        this.getaccount(this.accnumber);
    };
    ActivityActionComponent.prototype.changeAction = function (value) {
        if (value === 'OC' || value === 'IC' || value === 'MET') {
            this.actionForm.controls.party.enable();
            this.actionForm.controls.party.setValue('No Answer');
        }
        else {
            this.actionForm.controls.party.disable();
            this.actionForm.controls.party.setValue(null);
        }
    };
    ActivityActionComponent.prototype.changeParty = function (form) {
        if (form.party === 1 || form.party === 4 || form.party === 5) {
            this.actionForm.controls.ptp.enable();
        }
        else {
            this.actionForm.controls.ptp.disable();
            this.actionForm.controls.ptp.setValue('NO');
        }
    };
    ActivityActionComponent.prototype.changeReason = function (value) {
        if (value === 'Other') {
            this.actionForm.controls.rfdother.enable();
        }
        else {
            this.actionForm.controls.rfdother.disable();
        }
    };
    ActivityActionComponent.prototype.changePtp = function (value) {
        if (value === 'Yes') {
            this.actionForm.controls.ptpamount.enable();
            this.actionForm.controls.ptpdate.enable();
        }
        else {
            this.actionForm.controls.ptpamount.disable();
            this.actionForm.controls.ptpdate.disable();
            this.actionForm.controls.ptpamount.setValue(0);
            this.actionForm.controls.ptpdate.setValue(Date());
        }
    };
    ActivityActionComponent = __decorate([
        Component({
            selector: 'app-sendletter',
            templateUrl: './activityaction.component.html',
            styleUrls: ['./activityaction.component.scss'],
            providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            Router,
            FormBuilder,
            EcolService,
            DataService,
            NgxSpinnerService])
    ], ActivityActionComponent);
    return ActivityActionComponent;
}());
export { ActivityActionComponent };
//# sourceMappingURL=activityaction.component.js.map