import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewdatabaseformsComponent } from './viewdatabaseforms.component';

const routes: Routes = [
  { 
        path: '',
        component: ViewdatabaseformsComponent,
        data: {
          title: 'View Database forms'
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
export class ViewdatabaseformRoutingModule { }
