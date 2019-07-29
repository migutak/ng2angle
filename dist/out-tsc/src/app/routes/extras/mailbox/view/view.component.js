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
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../../../../core/settings/settings.service';
var ViewComponent = /** @class */ (function () {
    function ViewComponent(route, http, settings) {
        var _this = this;
        this.route = route;
        this.http = http;
        this.settings = settings;
        this.mail = {};
        this.sub = this.route.params.subscribe(function (params) {
            _this.http.get('assets/server/mails.json')
                .subscribe(function (data) {
                var mailsFound = data.mails.filter(function (m) { return (m.id === +params['mid']); });
                _this.mail = mailsFound.length ? mailsFound[0] : {};
            });
        });
    }
    ViewComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ViewComponent.prototype.ngOnInit = function () {
    };
    ViewComponent = __decorate([
        Component({
            selector: 'app-view',
            templateUrl: './view.component.html',
            styleUrls: ['./view.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, HttpClient, SettingsService])
    ], ViewComponent);
    return ViewComponent;
}());
export { ViewComponent };
//# sourceMappingURL=view.component.js.map