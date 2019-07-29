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
import { AgGridModule } from 'ag-grid-angular';
import { AllcardsComponent } from './allcards/allcards.component';
import { LoansComponent } from './loans/loans.component';
import { MyallocationsComponent } from './myallocations/myallocations.component';
import { MyworklistComponent } from './myworklist/myworklist.component';
import { ViewallComponent } from './viewall/viewall.component';
import { ZerobalanceComponent } from './zerobalance/zerobalance.component';
import { DemandsdueComponent } from './creditcarddemands/demandsdue/demandsdue.component';
import { DemandshistoryComponent } from './creditcarddemands/demandshistory/demandshistory.component';
import { JqxDomService } from '../../shared/jqwidgets-dom.service';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
var routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'allcards', component: AllcardsComponent },
    { path: 'loans', component: LoansComponent },
    { path: 'myallocations', component: MyallocationsComponent },
    { path: 'myworklist', component: MyworklistComponent },
    { path: 'viewall', component: ViewallComponent },
    { path: 'zerobalance', component: ZerobalanceComponent },
    // demands
    { path: 'creditcarddemands/demandsdue', component: DemandsdueComponent },
    { path: 'creditcarddemands/demandshistory', component: DemandshistoryComponent }
];
var CreditcardsModule = /** @class */ (function () {
    function CreditcardsModule() {
    }
    CreditcardsModule = __decorate([
        NgModule({
            declarations: [
                AllcardsComponent,
                LoansComponent,
                MyallocationsComponent,
                MyworklistComponent,
                ViewallComponent,
                ZerobalanceComponent,
                DemandsdueComponent,
                DemandshistoryComponent
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
    ], CreditcardsModule);
    return CreditcardsModule;
}());
export { CreditcardsModule };
//# sourceMappingURL=creditcards.module.js.map