import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZerobalanceComponent } from './zerobalance.component';

describe('PrelistingComponent', () => {
  let component: ZerobalanceComponent;
  let fixture: ComponentFixture<ZerobalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZerobalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZerobalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
