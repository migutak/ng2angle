import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demand2Component } from './demand2.component';

describe('Demand2Component', () => {
  let component: Demand2Component;
  let fixture: ComponentFixture<Demand2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demand2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demand2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
