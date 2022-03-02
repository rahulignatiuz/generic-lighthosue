import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminSettingsComponent } from './super-admin-settings.component';


const routes: Routes = [
  {
    path: '',
    component: SuperAdminSettingsComponent,
    data: {
      title: 'Super admin settings'
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
export class SuperAdminSettingsRoutingModule { }
