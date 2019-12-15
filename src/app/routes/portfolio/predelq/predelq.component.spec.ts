import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredelqComponent } from './predelq.component';

describe('PredelqComponent', () => {
  let component: PredelqComponent;
  let fixture: ComponentFixture<PredelqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredelqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredelqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
