import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';

import { SharedModule } from '../../shared/shared.module';
import { RelegateComponent } from './relegate/relegate.component';

const routes: Routes = [
    { path: '', redirectTo: 'relegate' },
    { path: 'relegate', component: RelegateComponent }
];

@NgModule({
    imports: [
        SharedModule,
        TreeModule.forRoot(),
        RouterModule.forChild(routes)
    ],
    declarations: [
        RelegateComponent
    ],
    exports: [
        RouterModule
    ]
})
export class TeamLeaderModule { }
