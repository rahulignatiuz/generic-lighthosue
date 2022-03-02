import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminUserManagementComponent } from './super-admin-user-management.component';

describe('SuperAdminUserManagementComponent', () => {
  let component: SuperAdminUserManagementComponent;
  let fixture: ComponentFixture<SuperAdminUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
