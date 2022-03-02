import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from './404.component';


const routes: Routes = [
  {
    path: '',
    component: P404Component,
    data: {
      title: '404 '
    }
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class P404RoutingModule { }