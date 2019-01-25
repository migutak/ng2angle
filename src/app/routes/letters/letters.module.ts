import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { SettingsComponent } from './settings/settings.component';
import { NgxSelectModule } from 'ngx-select-ex';

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
    SettingsComponent,
  ],
  exports: [
      RouterModule
  ]
})
export class LettersModule { }


