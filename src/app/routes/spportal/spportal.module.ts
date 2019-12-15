import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

///
import { SharedModule } from '../../shared/shared.module';
import { PortalComponent } from './portal/portal.component';

const routes: Routes = [
    { path: '', redirectTo: 'portal' },
    { path: 'portal', component: PortalComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        PortalComponent
    ],
    exports: [
        RouterModule
    ]
})
export class SpPortalModule { }
