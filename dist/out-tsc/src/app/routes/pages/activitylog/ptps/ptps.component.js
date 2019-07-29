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
var PtpsComponent = /** @class */ (function () {
    function PtpsComponent(settings, route, ecolService) {
        this.settings = settings;
        this.route = route;
        this.ecolService = ecolService;
        this.model = {};
        this.ptps = [];
        this.account = [];
        this.charactersRemaining = 0;
        this.iscard = false;
        //
    }
    PtpsComponent.prototype.ngOnInit = function () {
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
        this.getptps();
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
    };
    PtpsComponent.prototype.getptps = function () {
        var _this = this;
        this.ecolService.getptps(this.accnumber).subscribe(function (data) {
            console.log(data);
            _this.ptps = data;
        }, function (error) {
            console.log(error);
        });
    };
    PtpsComponent.prototype.getaccount = function (account) {
        var _this = this;
        this.ecolService.getaccount(account).subscribe(function (data) {
            _this.account = data;
        });
    };
    PtpsComponent.prototype.getmcoopcashaccount = function (loanaccaccount) {
        var _this = this;
        this.ecolService.getmcoopcashAccount(loanaccaccount).subscribe(function (data) {
            _this.account = data;
        });
    };
    PtpsComponent.prototype.getcard = function (cardacct) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
        });
    };
    PtpsComponent.prototype.getwatchcard = function (cardacct) {
        var _this = this;
        this.ecolService.getWatchcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
        });
    };
    PtpsComponent.prototype.getwatch = function (accnumber) {
        var _this = this;
        this.ecolService.getwatch(accnumber).subscribe(function (data) {
            _this.account = data;
        });
    };
    PtpsComponent = __decorate([
        Component({
            selector: 'app-ptps',
            templateUrl: './ptps.component.html',
            styleUrls: ['./ptps.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            EcolService])
    ], PtpsComponent);
    return PtpsComponent;
}());
export { PtpsComponent };
//# sourceMappingURL=ptps.component.js.map