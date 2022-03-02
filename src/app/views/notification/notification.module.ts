import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';


@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    NgMultiSelectDropDownModule.forRoot(),
    ModalModule,
    NgxPaginationModule
  ]
})
export class NotificationModule { }
