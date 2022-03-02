import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddLessonsProcessComponent } from './add-lessons-process.component';
const routes: Routes = [
  { 
        path: '',
        component: AddLessonsProcessComponent,
        data: {
          title: 'Record Lesson Process'
        }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class AddLessonsProcessRoutingModule { }
