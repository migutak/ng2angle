import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyworklistComponent } from './myworklist.component';

describe('MyworklistComponent', () => {
  let component: MyworklistComponent;
  let fixture: ComponentFixture<MyworklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyworklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyworklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
