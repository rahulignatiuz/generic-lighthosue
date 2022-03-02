import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import {LessonsComponent } from './lessons/lessons.component';


const routes: Routes = [
  {
    path: '',
    component: AdmindashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'lessons',
    component: LessonsComponent,
    data: {
      title: 'Lessons'
    }
  }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmindashboardRoutingModule { }
