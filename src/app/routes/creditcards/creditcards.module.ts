import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AllcardsComponent } from './allcards/allcards.component';
import { MyallocationsComponent } from './myallocations/myallocations.component';
import { MyworklistComponent } from './myworklist/myworklist.component';
import { ViewallComponent } from './viewall/viewall.component';
import { ZerobalanceComponent } from './zerobalance/zerobalance.component';
import { DemandsdueComponent } from './creditcarddemands/demandsdue/demandsdue.component';
import { DemandshistoryComponent } from './creditcarddemands/demandshistory/demandshistory.component';
import {AgGridModule} from '@ag-grid-community/angular';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'allcards', component: AllcardsComponent },
  //{ path: 'loans', component: LoansComponent },
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
    //LoansComponent,
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
        RouterModule.forChild(routes),
        AgGridModule
    ],
  entryComponents: [],
  providers: [],
  exports: [
    RouterModule
]
})
export class CreditcardsModule { }
