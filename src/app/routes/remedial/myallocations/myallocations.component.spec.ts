import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyallocationsComponent } from './myallocations.component';

describe('Day40Component', () => {
  let component: MyallocationsComponent;
  let fixture: ComponentFixture<MyallocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyallocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyallocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
