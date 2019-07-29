import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SmsComponent } from './sms/sms.component';
import { AllocationsComponent } from './allocations/allocations.component';
import { AccplansComponent } from './accplans/accplans.component';

import { NgxSelectModule } from 'ngx-select-ex';
import { AgGridModule } from 'ag-grid-angular';
import { CustomFormsModule } from 'ng2-validation';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'sms', component: SmsComponent },
  { path: 'allocations', component: AllocationsComponent },
  { path: 'accplans', component: AccplansComponent }
];

@NgModule({
  imports: [
      SharedModule,
      CommonModule,
      NgxSelectModule,
      NgxSpinnerModule,
      AgGridModule.withComponents([]),
      RouterModule.forChild(routes),
      CustomFormsModule
  ],
  declarations: [
    SmsComponent,
    AllocationsComponent,
    AccplansComponent
  ],
  exports: [
      RouterModule
  ]
})
export class ConfigurationsModule { }
