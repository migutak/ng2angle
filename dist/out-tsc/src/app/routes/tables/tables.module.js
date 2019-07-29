var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { AgGridModule } from 'ag-grid-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';
import { StandardComponent } from './standard/standard.component';
import { ExtendedComponent } from './extended/extended.component';
import { DatatableComponent } from './datatable/datatable.component';
import { AngulargridComponent } from './angulargrid/angulargrid.component';
import { NgxdatatableComponent } from './ngxdatatable/ngxdatatable.component';
var routes = [
    { path: 'standard', component: StandardComponent },
    { path: 'extended', component: ExtendedComponent },
    { path: 'datatable', component: DatatableComponent },
    { path: 'aggrid', component: AngulargridComponent },
    { path: 'ngxdatatable', component: NgxdatatableComponent }
];
var TablesModule = /** @class */ (function () {
    function TablesModule() {
    }
    TablesModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes),
                Ng2TableModule,
                AgGridModule.withComponents([AngulargridComponent]),
                NgxDatatableModule
            ],
            declarations: [
                StandardComponent,
                ExtendedComponent,
                DatatableComponent,
                AngulargridComponent,
                NgxdatatableComponent
            ],
            exports: [
                RouterModule
            ]
        })
    ], TablesModule);
    return TablesModule;
}());
export { TablesModule };
//# sourceMappingURL=tables.module.js.map