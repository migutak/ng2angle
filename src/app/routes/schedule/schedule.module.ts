import { NgModule } from '@angular/core';
import { ScheduleComponent } from './schedule/schedule.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
    { path: '', component: ScheduleComponent },
];

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes),
        NgSelectModule
        
    ],
    declarations: [ScheduleComponent],
    bootstrap:    [ ScheduleComponent ],
    exports: [
        RouterModule
    ]
})
export class ScheduleModule { }
