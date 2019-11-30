import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AgGridModule } from '@ag-grid-community/angular';

import { ViewallComponent } from './viewall/viewall.component';
import { AllecreditComponent } from './allecredit/allecredit.component';
import { MyworklistComponent } from './myworklist/myworklist.component';
import { TodaysComponent } from './todays/todays.component';
import { PredelqComponent } from './predelq/predelq.component';
import { PtpsComponent } from './ptps/ptps.component';
import { WithfundsComponent } from './withfunds/withfunds.component';

import { JqxDomService } from '../../shared/jqwidgets-dom.service';
import { CustomFormsModule } from 'ng2-validation';

const routes: Routes = [
  { path: '', redirectTo: 'viewall' },
  { path: 'viewall', component: ViewallComponent },
  { path: 'allecredit', component: AllecreditComponent },
  { path: 'myworklist', component: MyworklistComponent },
  { path: 'todays', component: TodaysComponent },
  { path: 'predelq', component: PredelqComponent },
  { path: 'ptps', component: PtpsComponent },
  { path: 'withfunds', component: WithfundsComponent }
];

@NgModule({
  declarations: [
    ViewallComponent,
    AllecreditComponent,
    MyworklistComponent,
    TodaysComponent,
    PredelqComponent,
    PtpsComponent,
    WithfundsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(routes),
    CustomFormsModule
  ],
  entryComponents: [],
  providers: [
    JqxDomService
  ],
  exports: [
    RouterModule
]
})
export class McoopcashModule { }
