import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { jqxButtonComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
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

const routes: Routes = [
  { path: '', redirectTo: 'viewall' },
  { path: 'viewall', component: ViewallComponent },
  { path: 'myallocations', component: MyallocationsComponent },
  { path: 'myworklist', component: MyworklistComponent },
  { path: 'todays', component: TodaysComponent },
  { path: 'predelq', component: PredelqComponent },
  { path: 'ptps', component: PtpsComponent },
  { path: 'withfunds', component: WithfundsComponent }
];

@NgModule({
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
export class WorkModule { }
