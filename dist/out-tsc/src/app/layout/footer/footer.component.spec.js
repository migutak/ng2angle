/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { SettingsService } from '../../core/settings/settings.service';
describe('Component: Footer', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [SettingsService]
        }).compileComponents();
    });
    it('should create an instance', async(inject([SettingsService], function (settingsService) {
        var component = new FooterComponent(settingsService);
        expect(component).toBeTruthy();
    })));
});
//# sourceMappingURL=footer.component.spec.js.map