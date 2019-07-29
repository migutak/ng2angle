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
import { ActivatedRoute } from '@angular/router';
var ForumdiscussionComponent = /** @class */ (function () {
    function ForumdiscussionComponent(route) {
        this.route = route;
        this.answerCollapsed = false;
    }
    ForumdiscussionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.topid = +params['topid']; // (+) converts string param to a number
        });
    };
    ForumdiscussionComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ForumdiscussionComponent = __decorate([
        Component({
            selector: 'app-forumdiscussion',
            templateUrl: './forumdiscussion.component.html',
            styleUrls: ['./forumdiscussion.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute])
    ], ForumdiscussionComponent);
    return ForumdiscussionComponent;
}());
export { ForumdiscussionComponent };
//# sourceMappingURL=forumdiscussion.component.js.map