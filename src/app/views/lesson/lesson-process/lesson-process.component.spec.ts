import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonProcessComponent } from './lesson-process.component';

describe('LessonProcessComponent', () => {
  let component: LessonProcessComponent;
  let fixture: ComponentFixture<LessonProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
