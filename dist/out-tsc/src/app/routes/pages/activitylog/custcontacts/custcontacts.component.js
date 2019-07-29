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
import { NgxSpinnerService } from 'ngx-spinner';
var URL = environment.valor;
var CustContactsComponent = /** @class */ (function () {
    function CustContactsComponent(settings, route, ecolService, spinner) {
        this.settings = settings;
        this.route = route;
        this.ecolService = ecolService;
        this.spinner = spinner;
        this.model = {};
        this.addcontact = {};
        this.edit = false;
        //
    }
    CustContactsComponent.prototype.ngOnInit = function () {
        /** spinner starts on init */
        // this.spinner.show();
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
        // get contacts
        this.getcontacts(this.custnumber);
    };
    CustContactsComponent.prototype.savecontact = function (form) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.addcontact.custnumber = this.custnumber;
        this.addcontact.telephone = form.contactnumber;
        this.addcontact.email = form.email;
        this.addcontact.active = form.active;
        this.addcontact.owner = this.username;
        this.addcontact.updatedby = this.username;
        this.addcontact.updatedlast = new Date();
        // save to db
        this.ecolService.postteles(this.addcontact).subscribe(function (response) {
            swal('Good!', 'Contact saved!', 'success');
            _this.getcontacts(_this.custnumber);
        }, function (error) {
            console.log(error);
            swal({
                title: 'Ooops!',
                text: 'Contact Not saved!',
                type: 'error',
                footer: '<a href="http://helpdesk.co-opbank.co.ke" target="_blank">Report issue to helpdesk?</a>'
            });
        });
    };
    CustContactsComponent.prototype.editcontact = function (contact) {
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.model.id = contact.id;
        this.model.custnumber = contact.custnumber;
        this.model.contactnumber = contact.telephone;
        this.model.email = contact.email;
        this.model.active = contact.active;
        this.model.owner = this.username;
        this.model.updatedby = this.username;
        this.model.updatedlast = new Date();
        //
        this.edit = true;
    };
    CustContactsComponent.prototype.updatecontact = function (form) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.model.id = form.id;
        this.model.custnumber = this.custnumber;
        this.model.telephone = form.contactnumber;
        this.model.email = form.email;
        this.model.active = form.active;
        this.model.owner = this.username;
        this.model.updatedby = this.username;
        this.model.updatedlast = new Date();
        // save to db
        this.ecolService.putteles(this.model).subscribe(function (response) {
            swal('Good!', 'Contact updated!', 'success');
            _this.getcontacts(_this.custnumber);
        }, function (error) {
            console.log(error);
            swal('Ooops!', 'Contact Not updated!', 'error');
        });
    };
    CustContactsComponent.prototype.getcontacts = function (custnumber) {
        var _this = this;
        this.spinner.show();
        this.ecolService.getteles(custnumber).subscribe(function (data) {
            _this.contacts = data;
            _this.spinner.hide();
        }, function (error) {
            console.log(error);
            _this.spinner.hide();
        });
    };
    CustContactsComponent.prototype.cancel = function () {
        this.edit = false;
    };
    CustContactsComponent = __decorate([
        Component({
            selector: 'app-custcontacts',
            templateUrl: './custcontacts.component.html',
            styleUrls: ['./custcontacts.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService,
            ActivatedRoute,
            EcolService,
            NgxSpinnerService])
    ], CustContactsComponent);
    return CustContactsComponent;
}());
export { CustContactsComponent };
//# sourceMappingURL=custcontacts.component.js.map