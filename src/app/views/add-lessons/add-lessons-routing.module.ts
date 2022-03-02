import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddLessonsComponent } from './add-lessons.component';

const routes: Routes = [
  {
    path: '',
    component: AddLessonsComponent,
    data: {
      title: 'Record Lesson'
    }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddLessonsRoutingModule { }
