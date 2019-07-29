var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NewcaseComponent } from './newcase/newcase.component';
import { AllCasesComponent } from './allcases/allcases.component';
var routes = [
    { path: '', redirectTo: 'allcases' },
    { path: 'newcase', component: NewcaseComponent },
    { path: 'allcases', component: AllCasesComponent }
];
var AuctioneersModule = /** @class */ (function () {
    function AuctioneersModule() {
    }
    AuctioneersModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes)
            ],
            declarations: [
                AllCasesComponent,
                NewcaseComponent
            ],
            exports: [
                RouterModule
            ]
        })
    ], AuctioneersModule);
    return AuctioneersModule;
}());
export { AuctioneersModule };
//# sourceMappingURL=auctioneers.module.js.map