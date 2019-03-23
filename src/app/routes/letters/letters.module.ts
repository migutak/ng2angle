import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { SettingsComponent } from './settings/settings.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { FilterPipe} from './filter.pipe';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [
      SharedModule,
      CommonModule,
      NgxSelectModule,
      RouterModule.forChild(routes)
  ],
  declarations: [
    SettingsComponent, FilterPipe
  ],
  exports: [
      RouterModule
  ]
})
export class LettersModule { }


