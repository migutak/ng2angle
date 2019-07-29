/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslatorService } from './translator.service';
import { createTranslateLoader } from '../../app.module';
describe('Service: Translator', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [HttpClient]
                    }
                })
            ],
            providers: [TranslatorService]
        });
    });
    it('should ...', inject([TranslatorService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=translator.service.spec.js.map