import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from '@ag-grid-community/angular';
import { SharedModule } from '../../shared/shared.module';
import { RelegateComponent } from './relegate/relegate.component';

const routes: Routes = [
    { path: '', redirectTo: 'accounts' },
    { path: 'accounts', component: RelegateComponent }
];

@NgModule({
    imports: [
        SharedModule,
        AgGridModule.withComponents([]),
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
