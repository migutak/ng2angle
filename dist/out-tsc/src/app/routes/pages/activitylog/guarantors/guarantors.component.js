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
import { environment } from '../../../../../environments/environment';
var URL = environment.valor;
var GuarantorsComponent = /** @class */ (function () {
    function GuarantorsComponent(settings, route, ecolService) {
        this.settings = settings;
        this.route = route;
        this.ecolService = ecolService;
        this.model = {};
        this.guarantors = [];
        //
    }
    GuarantorsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
            _this.model.accnumber = queryParams.get('accnumber');
        });
        /*this.username = this.route.snapshot.queryParamMap.get('username');
        this.route.queryParamMap.subscribe(queryParams => {
          this.username = queryParams.get('username');
        });*/
        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.custnumber = queryParams.get('custnumber');
            _this.model.custnumber = queryParams.get('custnumber');
        });
        // get guarantors history
        this.getGuarantors(this.accnumber);
    };
    GuarantorsComponent.prototype.onSubmit = function (form) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        // Loading indictor
        this.ecolService.loader();
        //
        var body = {
            nationid: form.value.nationid,
            guarantorname: form.value.guarantorname,
            accnumber: this.model.accnumber,
            custnumber: this.model.custnumber,
            address: form.value.address,
            postalcode: form.value.postalcode,
            telnumber: form.value.telnumber,
            email: form.value.email,
            active: form.value.active
        };
        this.ecolService.submitGuarantor(body).subscribe(function (data) {
            swal('Successful!', 'saved successfully!', 'success');
            _this.getGuarantors(_this.accnumber);
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error occurred during processing!', 'error');
        });
    };
    GuarantorsComponent.prototype.getGuarantors = function (accnumber) {
        var _this = this;
        this.ecolService.guarantordetails(accnumber).subscribe(function (data) {
            _this.guarantors = data;
        }, function (error) {
            console.log(error);
        });
    };
    GuarantorsComponent.prototype.reset = function () {
        console.log('please!!!');
    };
    GuarantorsComponent = __decorate([
        Component({
            selector: 'app-guarantors',
            templateUrl: './guarantors.component.html',
            styleUrls: ['./guarantors.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            EcolService])
    ], GuarantorsComponent);
    return GuarantorsComponent;
}());
export { GuarantorsComponent };
//# sourceMappingURL=guarantors.component.js.map