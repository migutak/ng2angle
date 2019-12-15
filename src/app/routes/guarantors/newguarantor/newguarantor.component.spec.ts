import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewguarantorComponent } from './newguarantor.component';

describe('NewguarantorComponent', () => {
  let component: NewguarantorComponent;
  let fixture: ComponentFixture<NewguarantorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewguarantorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewguarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
