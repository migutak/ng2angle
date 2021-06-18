import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Dashboardv1Component } from './dashboardv1/dashboardv1.component';
import { Dashboardv2Component } from './dashboardv2/dashboardv2.component';
import { MetricsComponent } from './metrics/metrics.component';
import { LogsComponent } from './logs/logs.component';
import { RequestsComponent } from './requests/requests.component';

   

const routes: Routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'v1', component: Dashboardv1Component },
    { path: 'v2', component: Dashboardv2Component },
    { path: 'metrics', component: MetricsComponent },
    { path: 'logs', component: LogsComponent },
    { path: 'requests', component: RequestsComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        Dashboardv1Component,
        Dashboardv2Component,
        MetricsComponent,
        LogsComponent,
        RequestsComponent
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardModule { }
