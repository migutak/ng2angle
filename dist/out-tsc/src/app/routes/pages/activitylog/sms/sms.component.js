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
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
var SmsComponent = /** @class */ (function () {
    function SmsComponent(settings, route, ecolService) {
        this.settings = settings;
        this.route = route;
        this.ecolService = ecolService;
        this.model = {};
        this.sms = [];
        this.teles = [];
        this.dataSms = {};
        this.account = [];
        this.charactersRemaining = 0;
        this.iscard = false;
        //
    }
    SmsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
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
        this.getsms();
        if (this.sys === 'cc') {
            this.getcard(this.accnumber);
            this.iscard = true;
        }
        else if (this.sys === 'watchcc') {
            this.getwatchcard(this.accnumber);
            this.iscard = true;
        }
        else if (this.sys === 'watch') {
            this.getwatch(this.accnumber);
        }
        else if (this.sys === 'mcoopcash') {
            this.getmcoopcashaccount(this.accnumber);
        }
        else {
            this.getaccount(this.accnumber);
        }
        this.getteles(this.custnumber);
    };
    SmsComponent.prototype.getteles = function (cust) {
        var _this = this;
        this.ecolService.getallteles(cust).subscribe(function (data_teles) {
            _this.teles = data_teles;
        });
    };
    SmsComponent.prototype.getsms = function () {
        var _this = this;
        this.ecolService.getsms(this.custnumber).subscribe(function (data) {
            _this.sms = data;
        }, function (error) {
            console.log(error);
        });
    };
    SmsComponent.prototype.gettemplate = function (template) {
        if (template === 'LOAN') {
            // tslint:disable-next-line:max-line-length
            this.dataSms.smsMessage = 'Dear Customer, Your loan payment is late by ' + this.account.daysinarr + ' days. Amount in arrears is Kes. '
                + Math.round(this.account.instamount) + '. Please pay within seven days. ';
            this.dataSms.smsCallback = ' Enquire details on 0711049000';
        }
        else if (template === 'LOANOD') {
            this.dataSms.smsMessage = 'Dear Customer, Your account is overdrawn by  ' + this.account.currency + '. '
                + Math.round(this.account.oustbalance) + '. Please regularize within seven days.';
            this.dataSms.smsCallback = ' Enquire details on 0711049000';
        }
        else if (template === 'CC') {
            this.dataSms.smsMessage = 'Dear Customer, Your Credit Card payment is late by ' + this.account.daysinarrears +
                ' days. Amount Outstanding is Kes. ' + Math.round(this.account.outbalance) + '. Please pay within seven days. ';
            this.dataSms.smsCallback = ' Enquire details on 0711049000.';
        }
    };
    SmsComponent.prototype.changetemplate = function ($event) {
        this.gettemplate($event.target.value);
    };
    SmsComponent.prototype.getaccount = function (account) {
        var _this = this;
        this.ecolService.getaccount(account).subscribe(function (data) {
            _this.account = data;
        });
    };
    SmsComponent.prototype.getmcoopcashaccount = function (loanaccaccount) {
        var _this = this;
        this.ecolService.getmcoopcashAccount(loanaccaccount).subscribe(function (data) {
            _this.account = data;
        });
    };
    SmsComponent.prototype.getcard = function (cardacct) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
        });
    };
    SmsComponent.prototype.getwatchcard = function (cardacct) {
        var _this = this;
        this.ecolService.getWatchcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
        });
    };
    SmsComponent.prototype.getwatch = function (accnumber) {
        var _this = this;
        this.ecolService.getwatch(accnumber).subscribe(function (data) {
            _this.account = data;
        });
    };
    SmsComponent.prototype.sendsmsfunc = function (form) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.ecolService.loader();
        var body = {
            custnumber: this.custnumber,
            accnumber: this.accnumber,
            owner: this.username,
            message: form.value.smsMessage + form.value.smsCallback,
            arrears: this.account.totalarrears,
            datesent: new Date(),
            telnumber: form.value.smsNumber
        };
        this.ecolService.postsms(body).subscribe(function (data) {
            swal('Success!', 'sms sent', 'success');
            form.value.message = '';
            _this.getsms();
        }, function (error) {
            console.log(error);
            swal('Error!', 'sms service currently not available', 'error');
        });
    };
    SmsComponent = __decorate([
        Component({
            selector: 'app-sms',
            templateUrl: './sms.component.html',
            styleUrls: ['./sms.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            EcolService])
    ], SmsComponent);
    return SmsComponent;
}());
export { SmsComponent };
//# sourceMappingURL=sms.component.js.map