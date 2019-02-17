import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';

import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        Ng2ChartsModule
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }