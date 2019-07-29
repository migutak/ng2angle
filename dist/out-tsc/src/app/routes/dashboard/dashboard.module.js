var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Dashboardv1Component } from './dashboardv1/dashboardv1.component';
import { Dashboardv2Component } from './dashboardv2/dashboardv2.component';
import { Dashboardv3Component } from './dashboardv3/dashboardv3.component';
var routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'v1', component: Dashboardv1Component },
    { path: 'v2', component: Dashboardv2Component },
    { path: 'v3', component: Dashboardv3Component },
];
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes)
            ],
            declarations: [
                Dashboardv1Component,
                Dashboardv2Component,
                Dashboardv3Component
            ],
            exports: [
                RouterModule
            ]
        })
    ], DashboardModule);
    return DashboardModule;
}());
export { DashboardModule };
//# sourceMappingURL=dashboard.module.js.map