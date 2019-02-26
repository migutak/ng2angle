import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { jqxButtonComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { Demand1Component } from './demand1/demand1.component';
import { Demand2Component } from './demand2/demand2.component';
import { PrelistingComponent } from './prelisting/prelisting.component';
import { PostlistingComponent } from './postlisting/postlisting.component';
import { Day40Component } from './day40/day40.component';
import { Day90Component } from './day90/day90.component';

import { JqxDomService } from '../../shared/jqwidgets-dom.service';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'demands', component: Demand1Component },
  { path: 'demandhistory', component: Demand2Component }
  /*{ path: 'prelisting', component: PrelistingComponent },
  { path: 'postlisting', component: PostlistingComponent },
  { path: 'day40', component: Day40Component },
  { path: 'day90', component: Day90Component }*/
];

@NgModule({
  declarations: [
    Demand1Component,
    Demand2Component,
    PrelistingComponent,
    PostlistingComponent,
    Day40Component,
    Day90Component
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
export class DemandModule { }
