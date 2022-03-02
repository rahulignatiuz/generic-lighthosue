import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLessonProjectComponent } from './update-lesson-project.component';

describe('UpdateLessonProjectComponent', () => {
  let component: UpdateLessonProjectComponent;
  let fixture: ComponentFixture<UpdateLessonProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLessonProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLessonProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
