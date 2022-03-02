import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MylessonProcessComponent } from './mylesson-process.component';

describe('MylessonProcessComponent', () => {
  let component: MylessonProcessComponent;
  let fixture: ComponentFixture<MylessonProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MylessonProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MylessonProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
