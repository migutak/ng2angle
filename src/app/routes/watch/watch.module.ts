import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SharedModule } from '../../shared/shared.module';
import { CreditbuildupComponent } from './creditbuildup/creditbuildup.component';
import { NocreditComponent } from './nocredit/nocredit.component';

import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [
    { path: '', redirectTo: 'nocredit' },
    { path: 'nocredit', component: NocreditComponent },
    { path: 'creditbuildup', component: CreditbuildupComponent }
];

@NgModule({
    imports: [
        SharedModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(routes)
    ],
    declarations: [
        NocreditComponent,
        CreditbuildupComponent
    ],
    exports: [
        RouterModule
    ]
})
export class WatchModule { }
