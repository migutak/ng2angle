import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AllcardsComponent } from './allcards/allcards.component';
import { LoansComponent } from './loans/loans.component';
import { MyallocationsComponent } from './myallocations/myallocations.component';
import { MyworklistComponent } from './myworklist/myworklist.component';
import { ViewallComponent } from './viewall/viewall.component';
import { ZerobalanceComponent } from './zerobalance/zerobalance.component';
import { DemandsdueComponent } from './creditcarddemands/demandsdue/demandsdue.component';
import { DemandshistoryComponent } from './creditcarddemands/demandshistory/demandshistory.component';

import { JqxDomService } from '../../shared/jqwidgets-dom.service';
import { jqxButtonComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';

const routes: Routes = [
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

@NgModule({
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
    NgxDatatableModule,
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
export class CreditcardsModule { }
