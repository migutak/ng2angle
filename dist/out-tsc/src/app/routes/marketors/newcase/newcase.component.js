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
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
var NewcaseComponent = /** @class */ (function () {
    function NewcaseComponent(ecolService, router) {
        this.ecolService = ecolService;
        this.router = router;
        this.model = {};
        this.selectedSimpleItem = ['OWNER', 'THIRD PARTY'];
        this.accounts = [
            { accnumber: '000000000' }
        ];
    }
    NewcaseComponent.prototype.ngOnInit = function () {
    };
    NewcaseComponent.prototype.onSubmit = function (form) {
        // Loading indictor
        this.ecolService.loader();
        //
        var body = {
            propertyno: form.value.propertyno,
            openmarketvalue: form.value.omv,
            accnumber: form.value.accnumber,
            custnumber: form.value.custnumber,
            fileno: form.value.fileno,
            forcedsalevalue: form.value.fsv,
            dateinput: form.value.dateinput,
            owner: form.value.owner,
            custname: form.value.custname,
            ownership: form.value.ownership
        };
        this.ecolService.newmarketer(body).subscribe(function (data) {
            swal('Successful!', 'saved successfully!', 'success');
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error occurred during processing!', 'error');
        });
    };
    NewcaseComponent.prototype.cancel = function () {
        // redirect to ListComponent
        this.router.navigate(['/marketors/allcases']);
    };
    NewcaseComponent = __decorate([
        Component({
            selector: 'app-newcase',
            templateUrl: './newcase.component.html',
            styleUrls: ['./newcase.component.scss'],
            providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
        }),
        __metadata("design:paramtypes", [EcolService, Router])
    ], NewcaseComponent);
    return NewcaseComponent;
}());
export { NewcaseComponent };
//# sourceMappingURL=newcase.component.js.map