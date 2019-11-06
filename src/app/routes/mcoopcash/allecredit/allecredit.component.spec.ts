import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AllecreditComponent } from './allecredit.component';

describe('Day40Component', () => {
  let component: AllecreditComponent;
  let fixture: ComponentFixture<AllecreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllecreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllecreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
