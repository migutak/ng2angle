var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { AllReportsComponent } from './allreports/allreports.component';
var routes = [
    { path: '', redirectTo: 'allreports' },
    { path: 'allreports', component: AllReportsComponent },
    { path: 'dashboards', component: DashboardsComponent }
];
var ReportsModule = /** @class */ (function () {
    function ReportsModule() {
    }
    ReportsModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes)
            ],
            declarations: [
                AllReportsComponent,
                DashboardsComponent
            ],
            exports: [
                RouterModule
            ]
        })
    ], ReportsModule);
    return ReportsModule;
}());
export { ReportsModule };
//# sourceMappingURL=reports.module.js.map