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
var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent() {
        this.step1 = true;
        this.step2 = false;
        this.step3 = false;
        this.step4 = false;
        this.step5 = false;
        this.step6 = false;
    }
    CheckoutComponent.prototype.ngOnInit = function () { };
    CheckoutComponent = __decorate([
        Component({
            selector: 'app-checkout',
            templateUrl: './checkout.component.html',
            styleUrls: ['./checkout.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], CheckoutComponent);
    return CheckoutComponent;
}());
export { CheckoutComponent };
//# sourceMappingURL=checkout.component.js.map