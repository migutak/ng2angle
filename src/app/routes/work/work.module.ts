import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ViewallComponent } from './viewall/viewall.component';
import { MyallocationsComponent } from './myallocations/myallocations.component';
import { MyworklistComponent } from './myworklist/myworklist.component';
import { AllloansComponent } from './allloans/allloans.component';
import { PredelqComponent } from './predelq/predelq.component';
import { PtpsComponent } from './ptps/ptps.component';
import { WithfundsComponent } from './withfunds/withfunds.component';
import { RelegateComponent } from './relegate/relegate.component';
import { JqxDomService } from '../../shared/jqwidgets-dom.service';
//import { AgGridModule } from 'ag-grid-angular';
import { AgGridModule } from '@ag-grid-community/angular';

const routes: Routes = [
  { path: '', redirectTo: 'viewall' },
  { path: 'viewall', component: ViewallComponent },
  { path: 'myallocations', component: MyallocationsComponent },
  { path: 'myworklist', component: MyworklistComponent },
  { path: 'allloans', component: AllloansComponent },
  { path: 'predelq', component: PredelqComponent },
  { path: 'ptps', component: PtpsComponent },
  { path: 'withfunds', component: WithfundsComponent },
  { path: 'relegate', component: RelegateComponent }
];

@NgModule({
  declarations: [
    ViewallComponent,
    MyallocationsComponent,
    MyworklistComponent,
    AllloansComponent,
    PredelqComponent,
    PtpsComponent,
    WithfundsComponent,
    RelegateComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    NgxDatatableModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(routes)
  ],
  entryComponents: [],
  providers: [
    //JqxDomService
  ],
  exports: [
    RouterModule
]
})
export class WorkModule { }
