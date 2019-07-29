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
var TodaysComponent = /** @class */ (function () {
    function TodaysComponent() {
    }
    TodaysComponent.prototype.ngOnInit = function () {
    };
    TodaysComponent = __decorate([
        Component({
            selector: 'app-todays',
            templateUrl: './todays.component.html',
            styleUrls: ['./todays.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], TodaysComponent);
    return TodaysComponent;
}());
export { TodaysComponent };
//# sourceMappingURL=todays.component.js.map