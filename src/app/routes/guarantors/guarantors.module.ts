import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { ListComponent } from './list/list.component';
import { NewguarantorComponent } from './newguarantor/newguarantor.component';
import { EditguarantorComponent } from './editguarantor/editguarantor.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'list', component: ListComponent },
  { path: 'newguarantor', component: NewguarantorComponent },
  { path: 'editguarantor/:id', component: EditguarantorComponent }
];

@NgModule({
  imports: [
      SharedModule,
      RouterModule.forChild(routes)
  ],
  declarations: [
      ListComponent,
      NewguarantorComponent,
      EditguarantorComponent
  ],
  exports: [
      RouterModule
  ]
})

export class GuarantorsModule { }
