import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SharedModule } from '../../shared/shared.module';
import { AllManualsComponent } from './manuals/allmanuals.component';

const routes: Routes = [
    { path: '', redirectTo: 'all' },
    { path: 'all', component: AllManualsComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AllManualsComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ManualsModule { }
