import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SettingsComponent } from './settings/settings.component';
import { AutomationComponent } from './automation/automation.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { FilterPipe} from './filter.pipe';
import { AgGridModule } from 'ag-grid-angular';
import { CustomFormsModule } from 'ng2-validation'

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'settings', component: SettingsComponent },
  { path: 'automation', component: AutomationComponent }
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
    SettingsComponent,
    AutomationComponent,
    FilterPipe
  ],
  exports: [
      RouterModule
  ]
})
export class LettersModule { }


