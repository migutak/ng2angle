import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Day40Component } from './day40.component';

describe('Day40Component', () => {
  let component: Day40Component;
  let fixture: ComponentFixture<Day40Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Day40Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Day40Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
