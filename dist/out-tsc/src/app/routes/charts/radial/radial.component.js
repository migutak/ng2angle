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
var RadialComponent = /** @class */ (function () {
    function RadialComponent(colors) {
        this.colors = colors;
        this.easyPiePercent1 = 85;
        this.easyPiePercent2 = 45;
        this.easyPiePercent3 = 25;
        this.easyPiePercent4 = 60;
        this.pieOptions1 = {
            animate: {
                duration: 800,
                enabled: true
            },
            barColor: this.colors.byName('success'),
            trackColor: false,
            scaleColor: false,
            lineWidth: 10,
            lineCap: 'circle'
        };
        this.pieOptions2 = {
            animate: {
                duration: 800,
                enabled: true
            },
            barColor: this.colors.byName('warning'),
            trackColor: false,
            scaleColor: false,
            lineWidth: 4,
            lineCap: 'circle'
        };
        this.pieOptions3 = {
            animate: {
                duration: 800,
                enabled: true
            },
            barColor: this.colors.byName('danger'),
            trackColor: false,
            scaleColor: this.colors.byName('gray'),
            lineWidth: 15,
            lineCap: 'circle'
        };
        this.pieOptions4 = {
            animate: {
                duration: 800,
                enabled: true
            },
            barColor: this.colors.byName('danger'),
            trackColor: this.colors.byName('yellow'),
            scaleColor: this.colors.byName('gray-dark'),
            lineWidth: 15,
            lineCap: 'circle'
        };
    }
    RadialComponent.prototype.ngOnInit = function () {
    };
    RadialComponent.prototype.randomize = function () {
        this.easyPiePercent1 = this.random();
        this.easyPiePercent2 = this.random();
        this.easyPiePercent3 = this.random();
        this.easyPiePercent4 = this.random();
    };
    RadialComponent.prototype.random = function () {
        return Math.floor((Math.random() * 100) + 1);
    };
    RadialComponent = __decorate([
        Component({
            selector: 'app-radial',
            templateUrl: './radial.component.html',
            styleUrls: ['./radial.component.scss']
        }),
        __metadata("design:paramtypes", [ColorsService])
    ], RadialComponent);
    return RadialComponent;
}());
export { RadialComponent };
//# sourceMappingURL=radial.component.js.map