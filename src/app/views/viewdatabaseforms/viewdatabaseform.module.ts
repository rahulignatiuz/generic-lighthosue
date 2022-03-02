import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewdatabaseformsComponent } from './viewdatabaseforms.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ViewdatabaseformRoutingModule } from './viewdatabaseform-routing.module';

@NgModule({
  declarations: [ViewdatabaseformsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ViewdatabaseformRoutingModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class ViewdatabaseformModule { }
