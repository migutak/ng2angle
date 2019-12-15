import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditguarantorComponent } from './editguarantor.component';

describe('EditguarantorComponent', () => {
  let component: EditguarantorComponent;
  let fixture: ComponentFixture<EditguarantorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditguarantorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditguarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
