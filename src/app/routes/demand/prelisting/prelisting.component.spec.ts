import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrelistingComponent } from './prelisting.component';

describe('PrelistingComponent', () => {
  let component: PrelistingComponent;
  let fixture: ComponentFixture<PrelistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrelistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
