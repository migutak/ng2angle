var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
var NewguarantorComponent = /** @class */ (function () {
    function NewguarantorComponent(ecolService, router) {
        this.ecolService = ecolService;
        this.router = router;
        this.model = {};
    }
    NewguarantorComponent.prototype.ngOnInit = function () {
    };
    NewguarantorComponent.prototype.onSubmit = function (form) {
        // console.log(form.value);
        // Loading indictor
        this.ecolService.loader();
        //
        var body = {
            nationid: form.value.nationid,
            guarantorname: form.value.guarantorname,
            accnumber: form.value.accnumber,
            custnumber: form.value.custnumber,
            address: form.value.address,
            postalcode: form.value.postalcode,
            telnumber: form.value.telnumber,
            email: form.value.email,
            active: form.value.active
        };
        this.ecolService.submitGuarantor(body).subscribe(function (data) {
            swal('Successful!', 'saved successfully!', 'success');
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error occurred during processing!', 'error');
        });
    };
    NewguarantorComponent.prototype.cancel = function () {
        // redirect to ListComponent
        this.router.navigate(['/guarantors/list']);
    };
    NewguarantorComponent = __decorate([
        Component({
            selector: 'app-newguarantor',
            templateUrl: './newguarantor.component.html',
            styleUrls: ['./newguarantor.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService, Router])
    ], NewguarantorComponent);
    return NewguarantorComponent;
}());
export { NewguarantorComponent };
//# sourceMappingURL=newguarantor.component.js.map