import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelegateComponent } from './relegate.component';

describe('RelegateComponent', () => {
  let component: RelegateComponent;
  let fixture: ComponentFixture<RelegateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelegateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelegateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
