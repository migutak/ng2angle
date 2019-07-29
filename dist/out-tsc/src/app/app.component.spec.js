/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { APP_BASE_HREF } from '@angular/common';
describe('App: Ng2angle', function () {
    beforeEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                TranslateModule.forRoot(),
                CoreModule,
                LayoutModule,
                SharedModule,
                RoutesModule
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        });
    });
    it('should create the app', async(function () {
        var fixture = TestBed.createComponent(AppComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
//# sourceMappingURL=app.component.spec.js.map