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
import { FormBuilder, Validators } from '@angular/forms';
var ApprovalsComponent = /** @class */ (function () {
    function ApprovalsComponent(fb) {
        // Model Driven validation
        this.valForm = fb.group({
            'sometext': [null, Validators.required],
            'checkbox': [null, Validators.required],
            'radio': ['', Validators.required],
        });
    }
    ApprovalsComponent.prototype.ngOnInit = function () {
    };
    ApprovalsComponent.prototype.submitForm = function ($ev, value) {
        $ev.preventDefault();
        // tslint:disable-next-line:forin
        for (var c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
        }
        console.log(value);
    };
    ApprovalsComponent = __decorate([
        Component({
            selector: 'app-approvals',
            templateUrl: './approvals.component.html',
            styleUrls: ['./approvals.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], ApprovalsComponent);
    return ApprovalsComponent;
}());
export { ApprovalsComponent };
//# sourceMappingURL=approvals.component.js.map