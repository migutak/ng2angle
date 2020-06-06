import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from '@ag-grid-community/angular';
import { SharedModule } from '../../shared/shared.module';
import { RelegateComponent } from './relegate/relegate.component';
import { WriteoffapprovalsComponent } from './writeoffapprovals/writeoffapprovals.component';

const routes: Routes = [
    { path: '', redirectTo: 'relegationapprovals' },
    { path: 'relegationapprovals', component: RelegateComponent },
    { path: 'writeoffapprovals', component: WriteoffapprovalsComponent }
];

@NgModule({
    imports: [
        SharedModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(routes)
    ],
    declarations: [
        RelegateComponent,
        WriteoffapprovalsComponent
    ],
    exports: [
        RouterModule
    ]
})
export class TeamLeaderModule { }
