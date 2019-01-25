import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostlistingComponent } from './postlisting.component';

describe('PostlistingComponent', () => {
  let component: PostlistingComponent;
  let fixture: ComponentFixture<PostlistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostlistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
