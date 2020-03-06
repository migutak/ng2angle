import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';

import { SharedModule } from '../../shared/shared.module';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { AllReportsComponent } from './allreports/allreports.component';

const routes: Routes = [
    { path: '', redirectTo: 'allreports' },
    { path: 'allreports', component: AllReportsComponent },
    { path: 'dashboards', component: DashboardsComponent }
];

@NgModule({
    imports: [
        SharedModule,
        TreeModule.forRoot(),
        RouterModule.forChild(routes)
    ],
    declarations: [
        AllReportsComponent,
        DashboardsComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ReportsModule { }
