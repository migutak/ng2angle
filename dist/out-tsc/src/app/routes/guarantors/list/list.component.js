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
import { Router } from '@angular/router';
var ListComponent = /** @class */ (function () {
    function ListComponent(ecolService, router) {
        this.ecolService = ecolService;
        this.router = router;
    }
    ListComponent.prototype.ngOnInit = function () {
    };
    ListComponent.prototype.getguarantors = function (accnumber) {
        var _this = this;
        this.ecolService.loader();
        this.ecolService.retrieveGuarantors(accnumber).subscribe(function (data) {
            _this.guarantors = data;
            swal('Success!', 'Retrieved guarantors!', 'success');
            swal.hideLoading();
        }, function (error) {
            console.log(error);
            swal('Error!', 'Error retrieving guarantors!', 'error');
        });
    };
    ListComponent.prototype.update = function (id) {
        // redirect to ListComponent
        this.router.navigate(['/guarantors/editguarantor/' + id]);
    };
    ListComponent.prototype.addnew = function () {
        // redirect to ListComponent
        this.router.navigate(['/guarantors/newguarantor']);
    };
    ListComponent = __decorate([
        Component({
            selector: 'app-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.scss']
        }),
        __metadata("design:paramtypes", [EcolService, Router])
    ], ListComponent);
    return ListComponent;
}());
export { ListComponent };
//# sourceMappingURL=list.component.js.map