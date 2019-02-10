import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatorService } from '../core/translator/translator.service';
import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { menu } from './menu';
import { user_mgmt } from './menu_user_mgmt';
import { routes } from './routes';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        PagesModule
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {
    constructor(
        public menuService: MenuService,
        tr: TranslatorService
        ) {
        // user permissions
        /*const userperm = JSON.parse(localStorage.getItem('userpermission'));
        // console.log('RoutesModule', userperm[0].attr);

        if (userperm) {
            if (userperm[0].attr === 'Y' ) {
                menuService.addMenu(user_mgmt);
            } else {
                menuService.addMenu(menu);
            }
        }*/

        menuService.addMenu(menu);
    }
}
