import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from '@ag-grid-community/angular';

import { SharedModule } from '../../shared/shared.module';
import { MemogroupsComponent } from './memogroups/memogroups.component';
import { ColofficerComponent } from './colofficers/colofficers.component';
import { CreditcardsComponent } from './creditcards/creditcards.component';
import { EcreditComponent } from './ecredit/ecredit.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    { path: '', redirectTo: 'memogroups' },
    { path: 'memogroups', component: MemogroupsComponent },
    { path: 'colofficer', component: ColofficerComponent },
    { path: 'creditcards', component: CreditcardsComponent },
    { path: 'ecredit', component: EcreditComponent }
];

@NgModule({
    imports: [
        SharedModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(routes),
        Ng2SearchPipeModule,
        NgbModule
    ],
    declarations: [
        MemogroupsComponent,
        ColofficerComponent,
        CreditcardsComponent,
        EcreditComponent
    ],
    exports: [
        RouterModule
    ]
})
export class AllocationsModule { }
