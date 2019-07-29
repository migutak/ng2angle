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
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
var ValidationComponent = /** @class */ (function () {
    function ValidationComponent(fb) {
        this.blackList = ['bad@email.com', 'some@mail.com', 'wrong@email.co'];
        var password = new FormControl('', Validators.required);
        var certainPassword = new FormControl('', CustomValidators.equalTo(password));
        // Model Driven validation
        this.valForm = fb.group({
            'sometext': [null, Validators.required],
            'checkbox': [null, Validators.required],
            'radio': ['', Validators.required],
            'select': [null, Validators.required],
            'digits': [null, Validators.pattern('^[0-9]+$')],
            'minlen': [null, Validators.minLength(6)],
            'maxlen': [null, Validators.maxLength(10)],
            'email': [null, CustomValidators.email],
            'url': [null, CustomValidators.url],
            'date': [null, CustomValidators.date],
            'number': [null, Validators.compose([Validators.required, CustomValidators.number])],
            'alphanum': [null, Validators.pattern('^[a-zA-Z0-9]+$')],
            'minvalue': [null, CustomValidators.min(6)],
            'maxvalue': [null, CustomValidators.max(10)],
            'minwords': [null, this.minWords(6)],
            'maxwords': [null, this.maxWords(10)],
            'minmaxlen': [null, CustomValidators.rangeLength([6, 10])],
            'range': [null, CustomValidators.range([10, 20])],
            'rangewords': [null, Validators.compose([this.minWords(6), this.maxWords(10)])],
            'email_bl': [null, this.checkBlackList(this.blackList)],
            'passwordGroup': fb.group({
                password: password,
                confirmPassword: certainPassword
            })
        });
    }
    ValidationComponent.prototype.submitForm = function ($ev, value) {
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
    ValidationComponent.prototype.minWords = function (checkValue) {
        return (function (control) {
            return (control.value || '').split(' ').length >= checkValue ? null : { 'minWords': control.value };
        });
    };
    ValidationComponent.prototype.maxWords = function (checkValue) {
        return (function (control) {
            return (control.value || '').split(' ').length <= checkValue ? null : { 'maxWords': control.value };
        });
    };
    ValidationComponent.prototype.checkBlackList = function (list) {
        return (function (control) {
            return list.indexOf(control.value) < 0 ? null : { 'blacklist': control.value };
        });
    };
    ValidationComponent.prototype.ngOnInit = function () {
    };
    ValidationComponent = __decorate([
        Component({
            selector: 'app-validation',
            templateUrl: './validation.component.html',
            styleUrls: ['./validation.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], ValidationComponent);
    return ValidationComponent;
}());
export { ValidationComponent };
//# sourceMappingURL=validation.component.js.map