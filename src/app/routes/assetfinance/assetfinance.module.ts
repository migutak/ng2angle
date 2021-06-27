import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { AssetfinanceComponent } from './assetf/assetf.component';
import { IpfComponent } from './ipf/ipf.component';
import { IpfCancellationDueComponent } from './ipfcancellationsdue/ipfcancellationsdue.component';
import { IpfCancellationsDoneComponent } from './ipfcancellationsdone/ipfcancellationsdone.component';
import { AgGridModule } from '@ag-grid-community/angular';

const routes: Routes = [
    { path: '', redirectTo: 'asssetf' },
    { path: 'assetf', component: AssetfinanceComponent },
    { path: 'ipf', component: IpfComponent },
    { path: 'ipfcancellationsdue', component: IpfCancellationDueComponent },
    { path: 'ipfcancellationsdone', component: IpfCancellationsDoneComponent }
];

@NgModule({
    imports: [
        SharedModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(routes)
    ],
    declarations: [
        AssetfinanceComponent,
        IpfComponent,
        IpfCancellationDueComponent,
        IpfCancellationsDoneComponent
    ],
    exports: [
        RouterModule
    ]
})
export class AssetfinanceModule { }
