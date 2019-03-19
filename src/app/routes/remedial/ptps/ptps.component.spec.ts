import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtpsComponent } from './ptps.component';

describe('PrelistingComponent', () => {
  let component: PtpsComponent;
  let fixture: ComponentFixture<PtpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
