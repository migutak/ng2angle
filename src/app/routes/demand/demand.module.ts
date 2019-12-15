import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AgGridModule } from '@ag-grid-community/angular';

import { Demand1Component } from './demand1/demand1.component';
import { DemandhisComponent } from './demandhis/demandhis.component';
import { DemandsdueComponent } from './demandsdue/demandsdue.component';


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
  entryComponents: [],
  providers: [  ],
  exports: [
    RouterModule
]
})
export class DemandModule { }
