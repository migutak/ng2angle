/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { Router } from '@angular/router';
import { MenuService } from '../../core/menu/menu.service';
import { SettingsService } from '../../core/settings/settings.service';
describe('Component: Sidebar', function () {
    var mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [
                MenuService,
                SettingsService,
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();
    });
    it('should create an instance', async(inject([MenuService, SettingsService, Router], function (menuService, settingsService, router) {
        var component = new SidebarComponent(menuService, settingsService, router);
        expect(component).toBeTruthy();
    })));
});
//# sourceMappingURL=sidebar.component.spec.js.map