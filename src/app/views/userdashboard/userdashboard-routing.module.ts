import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserdashboardComponent } from '../userdashboard/userdashboard.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { MylessonsProjectComponent } from './mylesson-project/mylesson-project.component';
import { AddLessonComponent } from './add-project/add-project.component';
import { AddProcessComponent } from './add-process/add-process.component';
import { UpdateProcessComponent } from './update-process/update-process.component';
import { MylessonProcessComponent } from './mylesson-process/mylesson-process.component';
import { BulkImportComponent } from './bulk-import/bulk-import.component';

const routes: Routes = [
  {
    path: '',
    component: UserdashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'add-project',
    component: AddLessonComponent,
    data: {
      title: 'Add Project Lesson'
    }
  },
  {
    path: 'add-process',
    component: AddProcessComponent,
    data: {
      title: 'Add Process Lesson'
    }
  },
  {
    path: 'update-project/:id',
    component: UpdateProjectComponent,
    data: {
      title: 'Edit a Lesson'
    }
  },
  {
    path: 'mylessons-project',
    component: MylessonsProjectComponent,
    data: {
      title: 'Project Lessons'
    }
  },
  {
    path: 'mylessons-process',
    component: MylessonProcessComponent,
    data: {
      title: 'Process Lessons'
    }
  },
  {
    path: 'update-process/:id',
    component: UpdateProcessComponent,
    data: {
      title: 'Edit a Lesson'
    }
  },
  {
    path: 'bulk-import/:id',
    component: BulkImportComponent,
    data: {
      title: 'Import-History'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserdashboardRoutingModule { }
