/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { OffsidebarComponent } from './offsidebar.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SettingsService } from '../../core/settings/settings.service';
import { ThemesService } from '../../core/themes/themes.service';
import { TranslatorService } from '../../core/translator/translator.service';
import { SharedModule } from '../../shared/shared.module';
import { createTranslateLoader } from '../../app.module';
describe('Component: Offsidebar', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [HttpClient]
                    }
                }),
                HttpClientModule,
                SharedModule
            ],
            providers: [SettingsService, ThemesService, TranslatorService]
        }).compileComponents();
    });
    it('should create an instance', async(inject([SettingsService, ThemesService, TranslatorService], function (settingsService, themesService, translatorService) {
        var component = new OffsidebarComponent(settingsService, themesService, translatorService);
        expect(component).toBeTruthy();
    })));
});
//# sourceMappingURL=offsidebar.component.spec.js.map