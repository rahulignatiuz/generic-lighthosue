import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLessonsProcessComponent } from './add-lessons-process.component';
import { AddLessonsProcessRoutingModule } from './add-lessons-process-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    AddLessonsProcessComponent],
  imports: [
    CommonModule,
    AddLessonsProcessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    MatTabsModule,
    DragDropModule,
    ModalModule.forRoot(),
    TabsModule

  ]
})
export class AddLessonsProcessModule { }
