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
import { ColorsService } from '../../../shared/colors/colors.service';
var ExtendedComponent = /** @class */ (function () {
    function ExtendedComponent(colors) {
        this.colors = colors;
        this.sparkOptions1 = {
            barColor: this.colors.byName('primary'),
            height: 20,
            barWidth: 5,
            barSpacing: 2,
            resize: true
        };
        this.sparkOptions2 = {
            barColor: this.colors.byName('purple'),
            height: 20,
            barWidth: 5,
            barSpacing: 2,
            resize: true
        };
        this.sparkOptions3 = {
            barColor: this.colors.byName('info'),
            height: 20,
            barWidth: 5,
            barSpacing: 2,
            resize: true
        };
    }
    ExtendedComponent.prototype.ngOnInit = function () {
    };
    ExtendedComponent = __decorate([
        Component({
            selector: 'app-extended',
            templateUrl: './extended.component.html',
            styleUrls: ['./extended.component.scss']
        }),
        __metadata("design:paramtypes", [ColorsService])
    ], ExtendedComponent);
    return ExtendedComponent;
}());
export { ExtendedComponent };
//# sourceMappingURL=extended.component.js.map