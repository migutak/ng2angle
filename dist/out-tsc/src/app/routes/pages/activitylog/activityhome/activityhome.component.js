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
import { environment } from '../../../../../environments/environment';
var URL = environment.valor;
var ActivityHomeComponent = /** @class */ (function () {
    function ActivityHomeComponent(settings, route, ecolService) {
        this.settings = settings;
        this.route = route;
        this.ecolService = ecolService;
        this.model = {};
        this.date = new Date();
        this.loader = true;
        this.cards = [];
        this.ptps = [];
        this.otheraccs = [];
        this.collaterals = [];
        this.directors = [];
        this.accwithid = [];
    }
    ActivityHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
        });
        this.username = this.route.snapshot.queryParamMap.get('username');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.username = queryParams.get('username');
        });
        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.custnumber = queryParams.get('custnumber');
        });
        this.nationid = this.route.snapshot.queryParamMap.get('nationid');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.nationid = queryParams.get('nationid');
        });
        this.sys = this.route.snapshot.queryParamMap.get('sys');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.sys = queryParams.get('sys');
        });
        // get account details
        if (this.sys === 'cc') {
            this.getcard(this.accnumber);
        }
        else if (this.sys === 'watchcc') {
            this.getwatchcard(this.accnumber);
        }
        else if (this.sys === 'watch') {
            this.getwatch(this.accnumber);
        }
        else if (this.sys === 'mcoopcash') {
            this.getmcoop(this.accnumber);
        }
        else {
            this.getaccount(this.accnumber);
        }
    };
    ActivityHomeComponent.prototype.getaccount = function (accnumber) {
        var _this = this;
        this.ecolService.getAccount(accnumber).subscribe(function (data) {
            _this.account = data[0];
            _this.loader = false;
        });
    };
    ActivityHomeComponent.prototype.getwatch = function (accnumber) {
        var _this = this;
        this.ecolService.getwatch(accnumber).subscribe(function (data) {
            _this.account = data;
            _this.loader = false;
        });
    };
    ActivityHomeComponent.prototype.getcard = function (cardacct) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
            _this.loader = false;
        });
    };
    ActivityHomeComponent.prototype.getwatchcard = function (cardacct) {
        var _this = this;
        this.ecolService.getWatchcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
            _this.loader = false;
        });
    };
    ActivityHomeComponent.prototype.getmcoop = function (loanaccnumber) {
        var _this = this;
        this.ecolService.getmcoopcashAccount(loanaccnumber).subscribe(function (data) {
            _this.account = data[0];
            _this.loader = false;
        });
    };
    ActivityHomeComponent.prototype.beforeChange = function (active) {
        var tab = active.nextId;
        switch (tab) {
            case 'ngb-tab-0': {
                // console.log("accountinfo");
                break;
            }
            case 'ngb-tab-1': {
                this.loadptps(this.accnumber);
                break;
            }
            case 'ngb-tab-2': {
                this.loadother(this.custnumber);
                break;
            }
            case 'ngb-tab-3': {
                this.loadcollateral(this.accnumber);
                break;
            }
            case 'ngb-tab-4': {
                this.loaddirectors(this.accnumber);
                break;
            }
            case 'ngb-tab-5': {
                this.loadcards(this.nationid);
                break;
            }
            case 'ngb-tab-6': {
                this.loadaccwithid(this.nationid);
                break;
            }
            default: {
                console.log('Invalid choice');
                break;
            }
        }
    };
    ActivityHomeComponent.prototype.loadother = function (custnumber) {
        var _this = this;
        this.loader = true;
        this.ecolService.otheraccs(custnumber).subscribe(function (data) {
            _this.otheraccs = data;
            _this.loader = false;
        }, function (error) {
            console.log('loadother error ==>', error);
            alert('unable to retrieve otheraccs');
            _this.loader = false;
        });
    };
    ActivityHomeComponent.prototype.loadcollateral = function (accnumber) {
        var _this = this;
        this.loader = true;
        this.ecolService.collaterals(accnumber).subscribe(function (data) {
            _this.collaterals = data;
            _this.loader = false;
        }, function (error) {
            console.log('collaterals error ==>', error);
            alert('unable to retrieve collaterals');
            _this.loader = false;
        });
    };
    ActivityHomeComponent.prototype.loaddirectors = function (accnumber) {
        var _this = this;
        this.loader = true;
        this.ecolService.directors(accnumber).subscribe(function (data) {
            _this.directors = data;
            _this.loader = false;
        }, function (error) {
            console.log('directors error ==>', error);
            alert('unable to retrieve directors');
            _this.loader = false;
        });
    };
    ActivityHomeComponent.prototype.loadaccwithid = function (nationid) {
        var _this = this;
        this.loader = true;
        this.ecolService.accwithid(nationid).subscribe(function (data) {
            _this.accwithid = data;
            _this.loader = false;
        }, function (error) {
            console.log('loadaccwithid error ==>', error);
            alert('unable to retrieve accwithid');
            _this.loader = false;
        });
    };
    ActivityHomeComponent.prototype.loadptps = function (accnumber) {
        var _this = this;
        this.loader = true;
        this.ecolService.getptps(accnumber).subscribe(function (data) {
            console.log('ptp', data);
            _this.ptps = data;
            _this.loader = false;
        }, function (error) {
            console.log('loadptps error ==>', error);
            alert('unable to retrieve ptps');
            _this.loader = false;
        });
    };
    ActivityHomeComponent.prototype.loadcards = function (nationid) {
        var _this = this;
        this.loader = true;
        this.ecolService.getcardwithid(nationid).subscribe(function (data) {
            _this.cards = data;
            _this.loader = false;
        }, function (error) {
            console.log('loadcards error ==>', error);
            alert('unable to retrieve cards');
            _this.loader = false;
        });
    };
    ActivityHomeComponent = __decorate([
        Component({
            selector: 'app-activityhome',
            templateUrl: './activityhome.component.html',
            styleUrls: ['./activityhome.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            EcolService])
    ], ActivityHomeComponent);
    return ActivityHomeComponent;
}());
export { ActivityHomeComponent };
//# sourceMappingURL=activityhome.component.js.map