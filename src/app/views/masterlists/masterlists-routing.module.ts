import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MasterlistsComponent } from './masterlists.component';

const routes: Routes = [
  { 
        path: '',
        component: MasterlistsComponent,
        data: {
          title: 'Master List'
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
export class MasterlistsRoutingModule { }
