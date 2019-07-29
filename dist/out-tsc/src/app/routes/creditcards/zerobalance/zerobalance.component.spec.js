import { async, TestBed } from '@angular/core/testing';
import { ZerobalanceComponent } from './zerobalance.component';
describe('PrelistingComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ZerobalanceComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ZerobalanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=zerobalance.component.spec.js.map