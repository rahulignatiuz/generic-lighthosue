import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateFormsComponent } from './create-forms.component';


const routes: Routes = [
  {
    path: '',
    component: CreateFormsComponent,
    data: {
      title: 'Create Forms'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateFormsRoutingModule { }
