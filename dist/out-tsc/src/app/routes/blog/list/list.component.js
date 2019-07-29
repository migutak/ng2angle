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
var ListComponent = /** @class */ (function () {
    function ListComponent() {
        this.words = [
            {
                text: 'Lorem',
                weight: 13
                //link: 'http://themicon.co'
            }, {
                text: 'Ipsum',
                weight: 10.5
            }, {
                text: 'Dolor',
                weight: 9.4
            }, {
                text: 'Sit',
                weight: 8
            }, {
                text: 'Amet',
                weight: 6.2
            }, {
                text: 'Consectetur',
                weight: 5
            }, {
                text: 'Adipiscing',
                weight: 5
            }, {
                text: 'Sit',
                weight: 8
            }, {
                text: 'Amet',
                weight: 6.2
            }, {
                text: 'Consectetur',
                weight: 5
            }, {
                text: 'Adipiscing',
                weight: 5
            }
        ];
    }
    ListComponent.prototype.ngOnInit = function () {
    };
    ListComponent = __decorate([
        Component({
            selector: 'app-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ListComponent);
    return ListComponent;
}());
export { ListComponent };
//# sourceMappingURL=list.component.js.map