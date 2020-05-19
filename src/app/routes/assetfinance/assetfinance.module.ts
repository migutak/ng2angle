import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { AssetfinanceComponent } from './assetf/assetf.component';
import { IpfComponent } from './ipf/ipf.component';
import { AgGridModule } from '@ag-grid-community/angular';

const routes: Routes = [
    { path: '', redirectTo: 'asssetf' },
    { path: 'assetf', component: AssetfinanceComponent },
    { path: 'ipf', component: IpfComponent }
];

@NgModule({
    imports: [
        SharedModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(routes)
    ],
    declarations: [
        AssetfinanceComponent,
        IpfComponent
    ],
    exports: [
        RouterModule
    ]
})
export class AssetfinanceModule { }
