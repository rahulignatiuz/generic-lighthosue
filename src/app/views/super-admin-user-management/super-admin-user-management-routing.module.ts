import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperAdminUserManagementComponent } from './super-admin-user-management.component';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminUserManagementComponent,
    data: {
      title: 'Super Admin User Management'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminUserManagementRoutingModule {}