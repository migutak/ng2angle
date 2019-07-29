var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Injector } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
var LockComponent = /** @class */ (function () {
    function LockComponent(settings, fb, injector) {
        this.settings = settings;
        this.injector = injector;
        this.valForm = fb.group({
            'password': [null, Validators.required]
        });
    }
    LockComponent.prototype.submitForm = function ($ev, value) {
        $ev.preventDefault();
        for (var c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
            console.log(value);
            this.router.navigate(['home']);
        }
    };
    LockComponent.prototype.ngOnInit = function () {
        this.router = this.injector.get(Router);
    };
    LockComponent = __decorate([
        Component({
            selector: 'app-lock',
            templateUrl: './lock.component.html',
            styleUrls: ['./lock.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService, FormBuilder, Injector])
    ], LockComponent);
    return LockComponent;
}());
export { LockComponent };
//# sourceMappingURL=lock.component.js.map