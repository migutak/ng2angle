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
var AccPlanComponent = /** @class */ (function () {
    function AccPlanComponent(settings, route, ecolService) {
        this.settings = settings;
        this.route = route;
        this.ecolService = ecolService;
        //
    }
    AccPlanComponent.prototype.ngOnInit = function () {
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
        // get account details
    };
    AccPlanComponent.prototype.openaccplan = function () {
        // tslint:disable-next-line:max-line-length
        window.open(environment.accplanlink + '/?accnumber=' + this.accnumber + '&custnumber=' + this.custnumber + '&username=' + this.username + '&nationid=00', '_blank');
    };
    AccPlanComponent = __decorate([
        Component({
            selector: 'app-accplan',
            templateUrl: './accplan.component.html',
            styleUrls: ['./accplan.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            EcolService])
    ], AccPlanComponent);
    return AccPlanComponent;
}());
export { AccPlanComponent };
//# sourceMappingURL=accplan.component.js.map