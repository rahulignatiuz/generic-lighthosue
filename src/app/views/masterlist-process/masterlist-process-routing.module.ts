import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MasterlistProcessComponent } from './masterlist-process.component';

const routes: Routes = [
  { 
        path: '',
        component: MasterlistProcessComponent,
        data: {
          title: 'Master List - Process'
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
export class MasterlistProcessRoutingModule { }
