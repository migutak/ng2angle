var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';
import { SharedModule } from '../../shared/shared.module';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { FlotComponent } from './flot/flot.component';
import { RadialComponent } from './radial/radial.component';
var routes = [
    { path: 'flot', component: FlotComponent },
    { path: 'radial', component: RadialComponent },
    { path: 'chartjs', component: ChartjsComponent }
];
var ChartsModule = /** @class */ (function () {
    function ChartsModule() {
    }
    ChartsModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes),
                Ng2ChartsModule
            ],
            declarations: [
                FlotComponent,
                RadialComponent,
                ChartjsComponent
            ],
            exports: [
                RouterModule
            ]
        })
    ], ChartsModule);
    return ChartsModule;
}());
export { ChartsModule };
//# sourceMappingURL=charts.module.js.map