import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HowdoiComponent } from './howdoi.component';


const routes: Routes = [
  {
    path: '',
    component: HowdoiComponent,
    data: {
      title: 'How Do I '
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
export class HowdoiRoutingModule { }
