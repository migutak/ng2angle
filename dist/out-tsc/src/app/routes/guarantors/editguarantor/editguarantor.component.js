var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
var EditguarantorComponent = /** @class */ (function () {
    function EditguarantorComponent(ecolService, router, activeRoute) {
        this.ecolService = ecolService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.model = {
            custnumber: null
        };
    }
    EditguarantorComponent.prototype.ngOnInit = function () {
        // do something with the parameters
        this.getguarantor(this.activeRoute.snapshot.params.id);
    };
    EditguarantorComponent.prototype.onSubmit = function (form) {
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
        this.ecolService.updateGuarantor(this.activeRoute.snapshot.params.id, body).subscribe(function (data) {
            swal('Successful!', 'saved successfully!', 'success');
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error occurred during processing!', 'error');
        });
    };
    EditguarantorComponent.prototype.getguarantor = function (id) {
        var _this = this;
        this.ecolService.retrieve_a_Guarantor(id).subscribe(function (data) {
            _this.model = data[0];
        }, function (error) {
            console.log(error);
        });
    };
    EditguarantorComponent.prototype.cancel = function () {
        // redirect to ListComponent
        this.router.navigate(['/guarantors/list']);
    };
    EditguarantorComponent = __decorate([
        Component({
            selector: 'app-editguarantor',
            templateUrl: './editguarantor.component.html',
            styleUrls: ['./editguarantor.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService, Router, ActivatedRoute])
    ], EditguarantorComponent);
    return EditguarantorComponent;
}());
export { EditguarantorComponent };
//# sourceMappingURL=editguarantor.component.js.map