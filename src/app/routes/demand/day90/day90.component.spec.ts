import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Day90Component } from './day90.component';

describe('Day90Component', () => {
  let component: Day90Component;
  let fixture: ComponentFixture<Day90Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Day90Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Day90Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
