import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PmdashboardComponent } from '../pmdashboard/pmdashboard.component';
import { LessonsComponent} from './lessons/lessons.component';

const routes: Routes = [
  {
    path: '',
    component: PmdashboardComponent,
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
export class PmdashboardRoutingModule { }
