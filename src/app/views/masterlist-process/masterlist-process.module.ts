import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterlistProcessComponent } from './masterlist-process.component';
import  { MasterlistProcessRoutingModule } from './masterlist-process-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import {MatTabsModule} from '@angular/material/tabs';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ModalModule } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [
    MasterlistProcessComponent
  ],
  imports: [
    CommonModule,
    MasterlistProcessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    MatTabsModule,
    DragDropModule,
    ModalModule

  ]
})
export class MasterlistProcessModule { }
