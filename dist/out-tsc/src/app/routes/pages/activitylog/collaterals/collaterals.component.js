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
var CollateralsComponent = /** @class */ (function () {
    //
    function CollateralsComponent(settings, route, ecolService) {
        this.settings = settings;
        this.route = route;
        this.ecolService = ecolService;
        this.model = {};
        this.collaterals = [];
        this.edit = false;
        //
    }
    CollateralsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
            _this.model.accnumber = queryParams.get('accnumber');
        });
        this.username = this.route.snapshot.queryParamMap.get('username');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.username = queryParams.get('username');
        });
        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.custnumber = queryParams.get('custnumber');
            _this.model.custnumber = queryParams.get('custnumber');
        });
        // get guarantors history
        this.getCollateral(this.custnumber);
    };
    CollateralsComponent.prototype.onSubmit = function (form) {
        var _this = this;
        // Loading indictor
        this.ecolService.loader();
        //
        var body = {
            regowner: form.value.regowner,
            collateralname: form.value.collateralname,
            accnumber: this.model.accnumber,
            custnumber: this.model.custnumber,
            colofficer: this.username,
            forcedsale: form.value.forcedsale,
            insurancevalue: form.value.insurancevalue,
            marketvalue: form.value.marketvalue,
            tenure: form.value.tenure,
            valuationdate: form.value.valuationdate,
            valuer: form.value.valuer
        };
        this.ecolService.submitCollateral(body).subscribe(function (data) {
            swal('Successful!', 'saved successfully!', 'success');
            _this.getCollateral(_this.accnumber);
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error occurred during processing!', 'error');
        });
    };
    CollateralsComponent.prototype.getCollateral = function (custnumber) {
        var _this = this;
        this.ecolService.retrieveCollateral(custnumber).subscribe(function (data) {
            _this.collaterals = data;
        }, function (error) {
            console.log(error);
        });
    };
    CollateralsComponent.prototype.reset = function () {
        this.model.regowner = '';
        this.model.collateralname = '';
        this.model.forcedsale = '';
        this.model.insurancevalue = '';
        this.model.marketvalue = '';
        this.model.tenure = '';
        this.model.valuationdate = '';
        this.model.valuer = '';
    };
    CollateralsComponent.prototype.cancel = function () {
        this.edit = false;
        this.reset();
    };
    CollateralsComponent.prototype.updatecollateral = function (form) {
        var _this = this;
        // save to db
        this.ecolService.updateCollateral(this.model.id, form).subscribe(function (response) {
            swal('Good!', 'Collateral updated!', 'success');
            _this.getCollateral(_this.custnumber);
        }, function (error) {
            console.log(error);
            swal('Ooops!', 'Contact Not updated!', 'error');
        });
    };
    CollateralsComponent.prototype.editcollateral = function (collateral) {
        this.model.id = collateral.id;
        this.model.regowner = collateral.regowner;
        this.model.collateralname = collateral.collateralname;
        this.model.accnumber = collateral.accnumber;
        this.model.custnumber = collateral.custnumber;
        this.model.forcedsale = collateral.forcedsale;
        this.model.insurancevalue = collateral.insurancevalue;
        this.model.marketvalue = collateral.marketvalue;
        this.model.tenure = collateral.tenure;
        this.model.valuationdate = collateral.valuationdate;
        this.model.valuer = collateral.valuer;
        //
        this.edit = true;
    };
    CollateralsComponent = __decorate([
        Component({
            selector: 'app-collaterals',
            templateUrl: './collaterals.component.html',
            styleUrls: ['./collaterals.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            EcolService])
    ], CollateralsComponent);
    return CollateralsComponent;
}());
export { CollateralsComponent };
//# sourceMappingURL=collaterals.component.js.map