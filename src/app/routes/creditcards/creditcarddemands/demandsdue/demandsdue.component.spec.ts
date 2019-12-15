import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demand1Component } from './demand1.component';

describe('Demand1Component', () => {
  let component: Demand1Component;
  let fixture: ComponentFixture<Demand1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demand1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demand1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
