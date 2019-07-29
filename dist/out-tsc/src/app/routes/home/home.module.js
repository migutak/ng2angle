var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';
import { SharedModule } from '../../shared/shared.module';
var routes = [
    { path: '', component: HomeComponent },
];
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes),
                Ng2ChartsModule
            ],
            declarations: [HomeComponent],
            exports: [
                RouterModule
            ]
        })
    ], HomeModule);
    return HomeModule;
}());
export { HomeModule };
//# sourceMappingURL=home.module.js.map