var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CreditwatchComponent } from './creditwatch/creditwatch.component';
import { NocreditComponent } from './nocredit/nocredit.component';
import { AgGridModule } from 'ag-grid-angular';
var routes = [
    { path: '', redirectTo: 'nocredit' },
    { path: 'nocredit', component: NocreditComponent },
    { path: 'creditwatch', component: CreditwatchComponent }
];
var WatchModule = /** @class */ (function () {
    function WatchModule() {
    }
    WatchModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                AgGridModule.withComponents([]),
                RouterModule.forChild(routes)
            ],
            declarations: [
                NocreditComponent,
                CreditwatchComponent
            ],
            exports: [
                RouterModule
            ]
        })
    ], WatchModule);
    return WatchModule;
}());
export { WatchModule };
//# sourceMappingURL=watch.module.js.map