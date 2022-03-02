import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ngx-drag-drop';
import { FormsModule } from '@angular/forms';
import { CreateFormsComponent } from './create-forms.component';
import { CreateFormsRoutingModule } from './create-forms-routing.module';
import { TagInputModule } from 'ngx-chips';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule, MatToolbarModule} from '@angular/material';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    CreateFormsComponent
  ],
  imports: [
    TagInputModule,
    CommonModule,
    CreateFormsRoutingModule,
    DndModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    ModalModule
  ]
})
export class CreateFormsModule { }
