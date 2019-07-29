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
var ContactsComponent = /** @class */ (function () {
    function ContactsComponent() {
        this.favContact1 = false;
        this.favContact2 = true;
        this.favContact3 = false;
        this.favContact4 = false;
        this.favContact5 = true;
        this.favContact6 = true;
        this.favContact7 = false;
        this.favContact8 = false;
        this.favContact9 = false;
    }
    ContactsComponent.prototype.ngOnInit = function () {
    };
    ContactsComponent = __decorate([
        Component({
            selector: 'app-contacts',
            templateUrl: './contacts.component.html',
            styleUrls: ['./contacts.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ContactsComponent);
    return ContactsComponent;
}());
export { ContactsComponent };
//# sourceMappingURL=contacts.component.js.map