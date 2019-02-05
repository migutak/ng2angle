import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSwitchModule } from 'ngx-ui-switch';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { SearchComponent } from './search/search.component';
import { RolesComponent } from './roles/roles.component';
import { ApprovalsComponent } from './approvals/approvals.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'search', component: SearchComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'approvals', component: ApprovalsComponent }
];

@NgModule({
  imports: [
      SharedModule,
      RouterModule.forChild(routes)
  ],
  declarations: [
    SearchComponent,
    RolesComponent,
    ApprovalsComponent
  ],
  exports: [
      RouterModule
  ]
})
export class UsersModule { }
