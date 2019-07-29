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
var DashboardsComponent = /** @class */ (function () {
    function DashboardsComponent() {
    }
    DashboardsComponent.prototype.ngOnInit = function () {
    };
    DashboardsComponent.prototype.onNavigate = function (reportname) {
        window.open('activitydash?report=' + reportname, '_blank');
    };
    DashboardsComponent = __decorate([
        Component({
            selector: 'app-dashboards',
            templateUrl: './dashboards.component.html',
            styleUrls: ['./dashboards.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], DashboardsComponent);
    return DashboardsComponent;
}());
export { DashboardsComponent };
//# sourceMappingURL=dashboards.component.js.map