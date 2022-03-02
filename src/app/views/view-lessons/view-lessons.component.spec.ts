import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLessonsComponent } from './view-lessons.component';

describe('ViewLessonsComponent', () => {
  let component: ViewLessonsComponent;
  let fixture: ComponentFixture<ViewLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
