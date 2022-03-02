import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewLessonsComponent } from './view-lessons.component';


const routes: Routes = [
  {
    path: '',
    component: ViewLessonsComponent,
    data: {
      title: 'View Lesson '
    }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewLessonsRoutingModule { }
