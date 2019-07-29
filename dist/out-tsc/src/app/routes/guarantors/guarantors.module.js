var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ListComponent } from './list/list.component';
import { NewguarantorComponent } from './newguarantor/newguarantor.component';
import { EditguarantorComponent } from './editguarantor/editguarantor.component';
var routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'list', component: ListComponent },
    { path: 'newguarantor', component: NewguarantorComponent },
    { path: 'editguarantor/:id', component: EditguarantorComponent }
];
var GuarantorsModule = /** @class */ (function () {
    function GuarantorsModule() {
    }
    GuarantorsModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes)
            ],
            declarations: [
                ListComponent,
                NewguarantorComponent,
                EditguarantorComponent
            ],
            exports: [
                RouterModule
            ]
        })
    ], GuarantorsModule);
    return GuarantorsModule;
}());
export { GuarantorsModule };
//# sourceMappingURL=guarantors.module.js.map