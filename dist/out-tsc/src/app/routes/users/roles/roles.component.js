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
import { FormBuilder } from '@angular/forms';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
var RolesComponent = /** @class */ (function () {
    function RolesComponent(fb, ecolService) {
        this.ecolService = ecolService;
        this.settingActive = 1;
        // Model Driven validation
        this.valForm = fb.group({
            'role_id': [null],
            'administrator': [null],
            'teamleader': [null],
            'activity': [null],
            'configurations': [null],
            'external_agents': [null],
            'mcoopcash': [null],
            'collection': [false],
            'dashboard': [null],
            'creditcards': [null],
            'remedial': [null],
        });
    }
    RolesComponent.prototype.ngOnInit = function () {
        this.permission('1', 'admin');
    };
    RolesComponent.prototype.submitForm = function ($ev, value) {
        $ev.preventDefault();
        // tslint:disable-next-line:forin
        for (var c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            // console.log('Valid!');
            // console.log(value);
            // prepare permission data
            this.ecolService.loader();
            var body0 = {
                attr: value.administrator,
                role_id: value.role_id,
                perm_id: 'administrator'
            };
            var body1 = {
                attr: value.teamleader,
                role_id: value.role_id,
                perm_id: 'teamleader'
            };
            var body2 = {
                attr: value.remedial,
                role_id: value.role_id,
                perm_id: 'remedial'
            };
            var body3 = {
                attr: value.external_agents,
                role_id: value.role_id,
                perm_id: 'external_agents'
            };
            var body4 = {
                attr: value.configurations,
                role_id: value.role_id,
                perm_id: 'configurations'
            };
            var body5 = {
                attr: value.dashboard,
                role_id: value.role_id,
                perm_id: 'dashboard'
            };
            var body6 = {
                attr: value.collection,
                role_id: value.role_id,
                perm_id: 'collection'
            };
            var body7 = {
                attr: value.teamleader,
                role_id: value.role_id,
                perm_id: 'teamleader'
            };
            var body8 = {
                attr: value.mcoopcash,
                role_id: value.role_id,
                perm_id: 'mcoopcash'
            };
            var body9 = {
                attr: value.creditcards,
                role_id: value.role_id,
                perm_id: 'creditcards'
            };
            var body10 = {
                attr: value.activity,
                role_id: value.role_id,
                perm_id: 'activity'
            };
            this.ecolService.setpermissions(body1).subscribe(function (data) { });
            this.ecolService.setpermissions(body2).subscribe(function (data) { });
            this.ecolService.setpermissions(body3).subscribe(function (data) { });
            this.ecolService.setpermissions(body4).subscribe(function (data) { });
            this.ecolService.setpermissions(body5).subscribe(function (data) { });
            this.ecolService.setpermissions(body6).subscribe(function (data) { });
            this.ecolService.setpermissions(body7).subscribe(function (data) { });
            this.ecolService.setpermissions(body8).subscribe(function (data) { });
            this.ecolService.setpermissions(body9).subscribe(function (data) { });
            this.ecolService.setpermissions(body10).subscribe(function (data) { });
            this.ecolService.setpermissions(body0).subscribe(function (data) {
                swal('Successful!', 'Permissions set!', 'success');
            }, function (error) {
                console.log(error);
            });
        }
        else {
            return;
        }
    };
    RolesComponent.prototype.permission = function (perm, rights) {
        var _this = this;
        this.ecolService.loader();
        this.ecolService.getperm(rights).subscribe(function (data) {
            _this.valForm.patchValue({
                role_id: data[0].role_id,
                administrator: _this.truefalse(data[0].attr),
                teamleader: _this.truefalse(data[2].attr),
                activity: _this.truefalse(data[1].attr),
                configurations: _this.truefalse(data[3].attr),
                external_agents: _this.truefalse(data[8].attr),
                mcoopcash: _this.truefalse(data[4].attr),
                collection: _this.truefalse(data[5].attr),
                dashboard: _this.truefalse(data[9].attr),
                creditcards: _this.truefalse(data[7].attr),
                remedial: _this.truefalse(data[6].attr)
            });
            swal('Successful!', 'Permissions retrieved!', 'success');
        }, function (error) {
            console.log(error);
            swal('Error!', 'exception occured!', 'error');
        });
    };
    RolesComponent.prototype.truefalse = function (value) {
        if (value === 'true') {
            return true;
        }
        else {
            return false;
        }
    };
    RolesComponent = __decorate([
        Component({
            selector: 'app-roles',
            templateUrl: './roles.component.html',
            styleUrls: ['./roles.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder, EcolService])
    ], RolesComponent);
    return RolesComponent;
}());
export { RolesComponent };
//# sourceMappingURL=roles.component.js.map