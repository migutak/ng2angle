import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from '@ag-grid-community/angular';
import { SharedModule } from '../../shared/shared.module';
import { ChangerrocodeComponent } from './changerrocode/changerrocode.component';
import { RelegatedfilesComponent } from './relegatedfiles/relegatedfiles.component';

const routes: Routes = [
    { path: '', redirectTo: 'changerrocode' },
    { path: 'changerrocode', component: ChangerrocodeComponent },
    { path: 'relegatedfiles', component: RelegatedfilesComponent }
];

@NgModule({
    imports: [
        SharedModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(routes)
    ],
    declarations: [
        ChangerrocodeComponent,
        RelegatedfilesComponent
    ],
    exports: [
        RouterModule
    ]
})
export class AdminrelegationsModule { }
