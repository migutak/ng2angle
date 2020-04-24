import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
// Import angular-fusioncharts
// import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
// import * as FusionCharts from 'fusioncharts';
// import * as Charts from 'fusioncharts/fusioncharts.charts';
// import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Pass the fusioncharts library and chart modules
// FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);
//
const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes),
        NgSelectModule,
        NgxChartsModule
    ],
    declarations: [HomeComponent],
    bootstrap:    [ HomeComponent ],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }
