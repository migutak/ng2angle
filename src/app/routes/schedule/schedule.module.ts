import { NgModule } from '@angular/core';
import { ScheduleComponent } from './schedule/schedule.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
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
        NgSelectModule,
        NgxChartsModule
    ],
    declarations: [ScheduleComponent],
    bootstrap:    [ ScheduleComponent ],
    exports: [
        RouterModule
    ]
})
export class ScheduleModule { }
