import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SuperAdminUserManagementComponent } from './super-admin-user-management.component';
import { SuperAdminUserManagementRoutingModule } from './super-admin-user-management-routing.module';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      SuperAdminUserManagementRoutingModule,
      ChartsModule,
      BsDropdownModule,
      ButtonsModule.forRoot(),
      NgxPaginationModule,
      Ng2SearchPipeModule,
      ModalModule.forRoot(),
      NgMultiSelectDropDownModule.forRoot(),
    ],
    declarations: [ SuperAdminUserManagementComponent
      
    ]
  })
  export class SuperAdminUserManagementModule { }