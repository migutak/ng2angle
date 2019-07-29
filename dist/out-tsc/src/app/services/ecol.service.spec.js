import { TestBed } from '@angular/core/testing';
import { EcolService } from './ecol.service';
describe('EcolService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(EcolService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=ecol.service.spec.js.map