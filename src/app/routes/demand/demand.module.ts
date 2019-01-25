import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';

import { Demand1Component } from './demand1/demand1.component';
import { Demand2Component } from './demand2/demand2.component';
import { PrelistingComponent } from './prelisting/prelisting.component';
import { PostlistingComponent } from './postlisting/postlisting.component';
import { Day40Component } from './day40/day40.component';
import { Day90Component } from './day90/day90.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'demand1', component: Demand1Component },
  { path: 'demand2', component: Demand2Component },
  { path: 'prelisting', component: PrelistingComponent },
  { path: 'postlisting', component: PostlistingComponent },
  { path: 'day40', component: Day40Component },
  { path: 'day90', component: Day90Component }
];

@NgModule({
  declarations: [
    Demand1Component,
    Demand2Component,
    PrelistingComponent,
    PostlistingComponent,
    Day40Component,
    Day90Component,
    jqxGridComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
]
})
export class DemandModule { }
