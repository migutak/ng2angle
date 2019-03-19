import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithfundsComponent } from './withfunds.component';

describe('WithfundsComponent', () => {
  let component: WithfundsComponent;
  let fixture: ComponentFixture<WithfundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithfundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithfundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
