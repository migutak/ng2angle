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
var BugtrackerComponent = /** @class */ (function () {
    function BugtrackerComponent(colors) {
        this.colors = colors;
        this.sparkOptionsInfo = {
            type: 'pie',
            sliceColors: [this.colors.byName('gray-lighter'), this.colors.byName('info')],
            height: 50
        };
        this.sparkOptionsWarning = {
            type: 'pie',
            sliceColors: [this.colors.byName('gray-lighter'), this.colors.byName('warning')],
            height: 50
        };
        this.sparkOptionsSuccess = {
            type: 'pie',
            sliceColors: [this.colors.byName('gray-lighter'), this.colors.byName('success')],
            height: 50
        };
        this.sparkOptionsDanger = {
            type: 'pie',
            sliceColors: [this.colors.byName('gray-lighter'), this.colors.byName('danger')],
            height: 50
        };
    }
    BugtrackerComponent.prototype.ngOnInit = function () {
    };
    BugtrackerComponent = __decorate([
        Component({
            selector: 'app-bugtracker',
            templateUrl: './bugtracker.component.html',
            styleUrls: ['./bugtracker.component.scss']
        }),
        __metadata("design:paramtypes", [ColorsService])
    ], BugtrackerComponent);
    return BugtrackerComponent;
}());
export { BugtrackerComponent };
//# sourceMappingURL=bugtracker.component.js.map