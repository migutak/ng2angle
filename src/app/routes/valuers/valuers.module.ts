import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SharedModule } from '../../shared/shared.module';
import { NewcaseComponent } from './newcase/newcase.component';
import { AllCasesComponent } from './allcases/allcases.component';

const routes: Routes = [
    { path: '', redirectTo: 'allcases' },
    { path: 'newcase', component: NewcaseComponent },
    { path: 'allcases', component: AllCasesComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AllCasesComponent,
        NewcaseComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ValuersModule { }
