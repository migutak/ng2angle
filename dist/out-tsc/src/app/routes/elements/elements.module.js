var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import { DndModule } from 'ng2-dnd';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { GridComponent } from './grid/grid.component';
import { GridmasonryComponent } from './gridmasonry/gridmasonry.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsfontComponent } from './iconsfont/iconsfont.component';
import { IconsweatherComponent } from './iconsweather/iconsweather.component';
import { ColorsComponent } from './colors/colors.component';
import { InteractionComponent } from './interaction/interaction.component';
import { NotificationComponent } from './notification/notification.component';
import { NavtreeComponent } from './navtree/navtree.component';
import { SortableComponent } from './sortable/sortable.component';
import { InfinitescrollComponent } from './infinitescroll/infinitescroll.component';
import { SweetalertComponent } from './sweetalert/sweetalert.component';
var routes = [
    { path: 'buttons', component: ButtonsComponent },
    { path: 'interaction', component: InteractionComponent },
    { path: 'notification', component: NotificationComponent },
    { path: 'sweetalert', component: SweetalertComponent },
    { path: 'spinners', component: SpinnersComponent },
    { path: 'dropdown', component: DropdownComponent },
    { path: 'navtree', component: NavtreeComponent },
    { path: 'sortable', component: SortableComponent },
    { path: 'grid', component: GridComponent },
    { path: 'gridmasonry', component: GridmasonryComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'iconsfont', component: IconsfontComponent },
    { path: 'iconsweather', component: IconsweatherComponent },
    { path: 'colors', component: ColorsComponent },
    { path: 'infinitescroll', component: InfinitescrollComponent }
];
var ElementsModule = /** @class */ (function () {
    function ElementsModule() {
    }
    ElementsModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                RouterModule.forChild(routes),
                TreeModule.forRoot(),
                DndModule.forRoot(),
                InfiniteScrollModule
            ],
            declarations: [
                ButtonsComponent,
                SpinnersComponent,
                DropdownComponent,
                GridComponent,
                GridmasonryComponent,
                TypographyComponent,
                IconsfontComponent,
                IconsweatherComponent,
                ColorsComponent,
                InteractionComponent,
                NotificationComponent,
                NavtreeComponent,
                SortableComponent,
                InfinitescrollComponent,
                SweetalertComponent
            ],
            providers: [
                ToasterService
            ],
            exports: [
                RouterModule
            ]
        })
    ], ElementsModule);
    return ElementsModule;
}());
export { ElementsModule };
//# sourceMappingURL=elements.module.js.map