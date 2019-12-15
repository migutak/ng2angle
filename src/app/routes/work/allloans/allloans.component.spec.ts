import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllloansComponent } from './allloans.component';

describe('PostlistingComponent', () => {
  let component: AllloansComponent;
  let fixture: ComponentFixture<AllloansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllloansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllloansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
