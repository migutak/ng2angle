import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SharedModule } from '../../shared/shared.module';
import { CreditwatchComponent } from './creditwatch/creditwatch.component';
import { NocreditComponent } from './nocredit/nocredit.component';

import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [
    { path: '', redirectTo: 'nocredit' },
    { path: 'nocredit', component: NocreditComponent },
    { path: 'creditwatch', component: CreditwatchComponent }
];

@NgModule({
    imports: [
        SharedModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(routes)
    ],
    declarations: [
        NocreditComponent,
        CreditwatchComponent
    ],
    exports: [
        RouterModule
    ]
})
export class WatchModule { }
