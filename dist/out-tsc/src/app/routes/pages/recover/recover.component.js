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
import { SettingsService } from '../../../core/settings/settings.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
var RecoverComponent = /** @class */ (function () {
    function RecoverComponent(settings, fb) {
        this.settings = settings;
        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])]
        });
    }
    RecoverComponent.prototype.submitForm = function ($ev, value) {
        $ev.preventDefault();
        for (var c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
            console.log(value);
        }
    };
    RecoverComponent.prototype.ngOnInit = function () {
    };
    RecoverComponent = __decorate([
        Component({
            selector: 'app-recover',
            templateUrl: './recover.component.html',
            styleUrls: ['./recover.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService, FormBuilder])
    ], RecoverComponent);
    return RecoverComponent;
}());
export { RecoverComponent };
//# sourceMappingURL=recover.component.js.map