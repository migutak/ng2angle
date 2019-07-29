var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FlotDirective } from './directives/flot/flot.directive';
import { SparklineDirective } from './directives/sparkline/sparkline.directive';
import { EasypiechartDirective } from './directives/easypiechart/easypiechart.directive';
import { ColorsService } from './colors/colors.service';
import { CheckallDirective } from './directives/checkall/checkall.directive';
import { VectormapDirective } from './directives/vectormap/vectormap.directive';
import { NowDirective } from './directives/now/now.directive';
import { ScrollableDirective } from './directives/scrollable/scrollable.directive';
import { JqcloudDirective } from './directives/jqcloud/jqcloud.directive';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
// https://angular.io/styleguide#!#04-10
var SharedModule = /** @class */ (function () {
    // https://github.com/ocombe/ng2-translate/issues/209
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1
        };
    };
    var SharedModule_1;
    SharedModule = SharedModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                TranslateModule,
                AccordionModule.forRoot(),
                AlertModule.forRoot(),
                ButtonsModule.forRoot(),
                CarouselModule.forRoot(),
                CollapseModule.forRoot(),
                DatepickerModule.forRoot(),
                BsDatepickerModule.forRoot(),
                BsDropdownModule.forRoot(),
                ModalModule.forRoot(),
                PaginationModule.forRoot(),
                ProgressbarModule.forRoot(),
                RatingModule.forRoot(),
                TabsModule.forRoot(),
                TimepickerModule.forRoot(),
                TooltipModule.forRoot(),
                PopoverModule.forRoot(),
                TypeaheadModule.forRoot(),
                ToasterModule
            ],
            providers: [
                ColorsService
            ],
            declarations: [
                FlotDirective,
                SparklineDirective,
                EasypiechartDirective,
                CheckallDirective,
                VectormapDirective,
                NowDirective,
                ScrollableDirective,
                JqcloudDirective,
                jqxGridComponent,
                jqxButtonComponent
            ],
            exports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                TranslateModule,
                RouterModule,
                AccordionModule,
                AlertModule,
                ButtonsModule,
                CarouselModule,
                CollapseModule,
                DatepickerModule,
                BsDatepickerModule,
                BsDropdownModule,
                ModalModule,
                PaginationModule,
                ProgressbarModule,
                RatingModule,
                TabsModule,
                TimepickerModule,
                TooltipModule,
                PopoverModule,
                TypeaheadModule,
                ToasterModule,
                FlotDirective,
                SparklineDirective,
                EasypiechartDirective,
                CheckallDirective,
                VectormapDirective,
                NowDirective,
                ScrollableDirective,
                JqcloudDirective,
                jqxGridComponent,
                jqxButtonComponent
            ]
        })
        // https://github.com/ocombe/ng2-translate/issues/209
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.module.js.map