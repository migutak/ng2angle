/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { UserblockComponent } from './userblock.component';
import { UserblockService } from './userblock.service';
describe('Component: Userblock', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [UserblockService]
        }).compileComponents();
    });
    it('should create an instance', async(inject([UserblockService], function (userBlockService) {
        var component = new UserblockComponent(userBlockService);
        expect(component).toBeTruthy();
    })));
});
//# sourceMappingURL=userblock.component.spec.js.map