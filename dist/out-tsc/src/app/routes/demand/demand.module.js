var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { AgGridModule } from 'ag-grid-angular';
import { Demand1Component } from './demand1/demand1.component';
import { DemandhisComponent } from './demandhis/demandhis.component';
import { DemandsdueComponent } from './demandsdue/demandsdue.component';
import { JqxDomService } from '../../shared/jqwidgets-dom.service';
var routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'demands', component: DemandsdueComponent },
    { path: 'demandhistory', component: DemandhisComponent }
];
var DemandModule = /** @class */ (function () {
    function DemandModule() {
    }
    DemandModule = __decorate([
        NgModule({
            declarations: [
                Demand1Component,
                DemandhisComponent,
                DemandsdueComponent
            ],
            imports: [
                SharedModule,
                CommonModule,
                AgGridModule.withComponents([]),
                RouterModule.forChild(routes)
            ],
            entryComponents: [jqxButtonComponent],
            providers: [
                JqxDomService
            ],
            exports: [
                RouterModule
            ]
        })
    ], DemandModule);
    return DemandModule;
}());
export { DemandModule };
//# sourceMappingURL=demand.module.js.map