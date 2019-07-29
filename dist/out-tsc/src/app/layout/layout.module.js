var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NavsearchComponent } from './header/navsearch/navsearch.component';
import { OffsidebarComponent } from './offsidebar/offsidebar.component';
import { UserblockComponent } from './sidebar/userblock/userblock.component';
import { UserblockService } from './sidebar/userblock/userblock.service';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        NgModule({
            imports: [
                SharedModule
            ],
            providers: [
                UserblockService
            ],
            declarations: [
                LayoutComponent,
                SidebarComponent,
                UserblockComponent,
                HeaderComponent,
                NavsearchComponent,
                OffsidebarComponent,
                FooterComponent
            ],
            exports: [
                LayoutComponent,
                SidebarComponent,
                UserblockComponent,
                HeaderComponent,
                NavsearchComponent,
                OffsidebarComponent,
                FooterComponent
            ]
        })
    ], LayoutModule);
    return LayoutModule;
}());
export { LayoutModule };
//# sourceMappingURL=layout.module.js.map