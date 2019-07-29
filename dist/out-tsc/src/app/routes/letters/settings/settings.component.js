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
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(ecolService, route, spinner) {
        this.ecolService = ecolService;
        this.route = route;
        this.spinner = spinner;
        this.model = {};
        this.disable = true;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.getblobal();
    };
    SettingsComponent.prototype.setradio = function (e) {
        this.spinner.show();
        this.getLetter(e.toLowerCase());
        this.model.letterid = e.toLowerCase();
        this.selected_demand = e.toUpperCase();
    };
    SettingsComponent.prototype.getLetter = function (letter) {
        var _this = this;
        this.ecolService.getLetter(letter).subscribe(function (dletter) {
            _this.model = dletter;
            _this.model.bysms = (dletter.bysms).toLowerCase() === 'true' ? true : false;
            _this.model.byphysical = (dletter.byphysical).toLowerCase() === 'true' ? true : false;
            _this.model.byemail = (dletter.byemail).toLowerCase() === 'true' ? true : false;
            _this.model.suspendsms = (dletter.suspendsms).toLowerCase() === 'true' ? true : false;
            _this.model.suspendletter = (dletter.suspendletter).toLowerCase() === 'true' ? true : false;
            _this.model.suspendautodelivery = (dletter.suspendautodelivery).toLowerCase() === 'true' ? true : false;
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
            alert('error!');
            console.log(error);
        });
    };
    SettingsComponent.prototype.globalSubmit = function (form) {
        this.ecolService.loader();
        this.ecolService.global(this.model).subscribe(function (response) {
            swal('Success!', 'Settngs saved!', 'success');
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error occured!', 'error');
        });
    };
    SettingsComponent.prototype.getblobal = function () {
        this.ecolService.getglobal().subscribe(function (response) {
            console.log(response);
            // this.model = response[0];
        }, function (error) {
            console.log(error);
        });
    };
    SettingsComponent.prototype.onSubmit = function (form) {
        var _this = this;
        // Loading indictor
        this.spinner.show();
        //
        var body = {
            letterid: this.model.letterid,
            smstemplate: this.model.smstemplate,
            suspendletter: this.model.suspendletter,
            templatepath: this.model.templatepath || '0',
            autodelivered: this.model.autodelivered,
            suspendautodelivery: this.model.suspendautodelivery,
            suspendsms: this.model.suspendsms,
            datelastupdated: new Date(),
            updatedby: this.username,
            byemail: this.model.byemail,
            bysms: this.model.bysms,
            byphysical: this.model.byphysical
        };
        // check letter duplicate
        swal({
            title: 'Are you sure?',
            text: 'You want to update!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update!'
        }).then(function (result) {
            if (result.value) {
                _this.ecolService.loader();
                _this.ecolService.putLetter(body).subscribe(function (Response) {
                    swal('Successful!', 'letter updated!', 'success');
                    _this.spinner.hide();
                }, function (error) {
                    console.log(error);
                    _this.spinner.hide();
                    swal('Error!', 'Error updating letter!', 'error');
                });
            }
        });
    };
    SettingsComponent.prototype.delete = function () {
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
    SettingsComponent = __decorate([
        Component({
            selector: 'app-settings',
            templateUrl: './settings.component.html',
            styleUrls: ['./settings.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService,
            ActivatedRoute,
            NgxSpinnerService])
    ], SettingsComponent);
    return SettingsComponent;
}());
export { SettingsComponent };
//# sourceMappingURL=settings.component.js.map