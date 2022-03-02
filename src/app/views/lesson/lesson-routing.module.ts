import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { lessonComponent } from './lesson.component';
import { LessonProcessComponent } from './lesson-process/lesson-process.component';
//import { DropdownsComponent } from './dropdowns.component';
//import { BrandButtonsComponent } from './brand-buttons.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Lesson'
    },
    children: [
      {
        path: '',
        redirectTo: 'lessons'
      },
      {
        path: ':id',
        component: lessonComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'lesson-process/:id',
        component: LessonProcessComponent,
        data: {
          title: ''
        }
      },
      // {
      //   path: 'dropdowns',
      //   component: DropdownsComponent,
      //   data: {
      //     title: 'Dropdowns'
      //   }
      // },
      // {
      //   path: 'brand-buttons',
      //   component: BrandButtonsComponent,
      //   data: {
      //     title: 'Brand buttons'
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule {}
