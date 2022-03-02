import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UpdateLessonProjectComponent } from './update-lesson-project.component';


const routes: Routes = [
  {
    path: '',
    component: UpdateLessonProjectComponent,
    data: {
      title: 'Update project lessons '
    }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateLessonProjectRoutingModule { }
