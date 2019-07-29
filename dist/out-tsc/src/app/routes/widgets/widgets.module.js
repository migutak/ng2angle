var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from '../../shared/shared.module';
import { WidgetsComponent } from './widgets/widgets.component';
var routes = [
    { path: '', component: WidgetsComponent }
];
var WidgetsModule = /** @class */ (function () {
    function WidgetsModule() {
    }
    WidgetsModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes),
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyBNs42Rt_CyxAqdbIBK0a5Ut83QiauESPA'
                })
            ],
            declarations: [WidgetsComponent],
            exports: [
                RouterModule
            ]
        })
    ], WidgetsModule);
    return WidgetsModule;
}());
export { WidgetsModule };
//# sourceMappingURL=widgets.module.js.map