import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialwriteoffsComponent } from './potentialwriteoffs.component';

describe('RelegateComponent', () => {
  let component: PotentialwriteoffsComponent;
  let fixture: ComponentFixture<PotentialwriteoffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentialwriteoffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialwriteoffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
