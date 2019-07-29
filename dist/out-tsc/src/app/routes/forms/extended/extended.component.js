var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
var ExtendedComponent = /** @class */ (function () {
    function ExtendedComponent() {
        // Color Picker
        this.colorDemo1 = '#555555';
        this.colorDemo2 = '#555555';
        this.colorDemo3 = '#555555';
        this.colorDemo4 = '#555555';
        // ng2Select
        this.items = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
            'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
            'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
            'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
            'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
            'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
            'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
            'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
            'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
            'Zagreb', 'Zaragoza', 'Łódź'];
        this.value = {};
        this._disabledV = '0';
        this.disabled = false;
        // Datepicker
        this.bsValue = new Date();
        this.maxDate = new Date();
        this.bsConfig = {
            containerClass: 'theme-angle'
        };
        // Time picker
        this.mytime = new Date();
        this.formControlInput = new FormControl();
        // Tags Input
        this.validators = [this.startsWithAt, this.endsWith$];
        this.errorMessages = {
            'startsWithAt@': 'Your items need to start with "@"',
            'endsWith$': 'Your items need to end with "$"'
        };
        this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.myModel = '';
        this.modelWithValue = '5554441234';
        this.formControlInput.setValue('5555551234');
        // Datepicker
        this.maxDate.setDate(this.maxDate.getDate() + 7);
        this.bsRangeValue = [this.bsValue, this.maxDate];
    }
    Object.defineProperty(ExtendedComponent.prototype, "disabledV", {
        get: function () {
            return this._disabledV;
        },
        set: function (value) {
            this._disabledV = value;
            this.disabled = this._disabledV === '1';
        },
        enumerable: true,
        configurable: true
    });
    ExtendedComponent.prototype.selected = function (value) {
        console.log('Selected value is: ', value);
    };
    ExtendedComponent.prototype.removed = function (value) {
        console.log('Removed value is: ', value);
    };
    ExtendedComponent.prototype.typed = function (value) {
        console.log('New search input: ', value);
    };
    ExtendedComponent.prototype.refreshValue = function (value) {
        this.value = value;
    };
    ExtendedComponent.prototype.transform = function (item) {
        return "@" + item;
    };
    ExtendedComponent.prototype.startsWithAt = function (control) {
        if (control.value.charAt(0) !== '@') {
            return {
                'startsWithAt@': true
            };
        }
        return null;
    };
    ExtendedComponent.prototype.endsWith$ = function (control) {
        if (control.value.charAt(control.value.length - 1) !== '$') {
            return {
                'endsWith$': true
            };
        }
        return null;
    };
    ExtendedComponent.prototype.ngOnInit = function () {
    };
    ExtendedComponent = __decorate([
        Component({
            selector: 'app-extended',
            templateUrl: './extended.component.html',
            styleUrls: ['./extended.component.scss'],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [])
    ], ExtendedComponent);
    return ExtendedComponent;
}());
export { ExtendedComponent };
//# sourceMappingURL=extended.component.js.map