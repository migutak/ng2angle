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
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ViewallComponent } from './viewall/viewall.component';
import { MyallocationsComponent } from './myallocations/myallocations.component';
import { MyworklistComponent } from './myworklist/myworklist.component';
import { TodaysComponent } from './todays/todays.component';
import { PredelqComponent } from './predelq/predelq.component';
import { PtpsComponent } from './ptps/ptps.component';
import { WithfundsComponent } from './withfunds/withfunds.component';
import { JqxDomService } from '../../shared/jqwidgets-dom.service';
import { AgGridModule } from 'ag-grid-angular';
var routes = [
    { path: '', redirectTo: 'viewall' },
    { path: 'viewall', component: ViewallComponent },
    { path: 'myallocations', component: MyallocationsComponent },
    { path: 'myworklist', component: MyworklistComponent },
    { path: 'todays', component: TodaysComponent },
    { path: 'predelq', component: PredelqComponent },
    { path: 'ptps', component: PtpsComponent },
    { path: 'withfunds', component: WithfundsComponent }
];
var WorkModule = /** @class */ (function () {
    function WorkModule() {
    }
    WorkModule = __decorate([
        NgModule({
            declarations: [
                ViewallComponent,
                MyallocationsComponent,
                MyworklistComponent,
                TodaysComponent,
                PredelqComponent,
                PtpsComponent,
                WithfundsComponent
            ],
            imports: [
                SharedModule,
                CommonModule,
                NgxDatatableModule,
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
    ], WorkModule);
    return WorkModule;
}());
export { WorkModule };
//# sourceMappingURL=work.module.js.map