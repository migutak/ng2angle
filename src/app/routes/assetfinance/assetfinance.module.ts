import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';

import { SharedModule } from '../../shared/shared.module';
import { AssetfinanceComponent } from './assetf/assetf.component';
import { IpfComponent } from './ipf/ipf.component';

const routes: Routes = [
    { path: '', redirectTo: 'asssetf' },
    { path: 'assetf', component: AssetfinanceComponent },
    { path: 'ipf', component: IpfComponent }
];

@NgModule({
    imports: [
        SharedModule,
        TreeModule.forRoot(),
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
