import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { jqxButtonComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { AgGridModule } from 'ag-grid-angular';

import { Demand1Component } from './demand1/demand1.component';
import { DemandhisComponent } from './demandhis/demandhis.component';
import { DemandsdueComponent } from './demandsdue/demandsdue.component';

import { JqxDomService } from '../../shared/jqwidgets-dom.service';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'demands', component: DemandsdueComponent },
  { path: 'demandhistory', component: DemandhisComponent }
];

@NgModule({
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
export class DemandModule { }
