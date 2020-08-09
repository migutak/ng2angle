import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';

import { SharedModule } from '../../shared/shared.module';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { AllReportsComponent } from './allreports/allreports.component';
import { RollratesComponent } from './rollrates/rollrates.component';
import { BucketsummaryComponent } from './bucketsummary/bucketsummary.component';
import { FlexmonsterPivotModule } from 'ng-flexmonster';

const routes: Routes = [
    { path: '', redirectTo: 'allreports' },
    { path: 'allreports', component: AllReportsComponent },
    { path: 'dashboards', component: DashboardsComponent },
    { path: 'rollrates', component: RollratesComponent },
    { path: 'bucketsummary', component: BucketsummaryComponent }
];

@NgModule({
    imports: [
        SharedModule,
        FlexmonsterPivotModule,
        TreeModule.forRoot(),
        RouterModule.forChild(routes)
    ],
    declarations: [
        AllReportsComponent,
        DashboardsComponent,
        RollratesComponent,
        BucketsummaryComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ReportsModule { }
