import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

//import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './_guard/auth.guard';
import { SocialAuthComponent } from './views/social-auth/social-auth.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    redirectTo: '',
    pathMatch: 'full',
  },
  // {
  //   path: '404',
  //   component: P404Component,
  //   data: {
  //     title: 'Page 404'
  //   }
  // },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'social-auth',
    component: SocialAuthComponent,
    data: {
      title: 'Social Authentication '
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivateChild: [AuthGuard],
    data: {
      title: ''
    },
    children: [
      {
        path: 'super-admin',
        loadChildren: () => import('./views/super-admin-settings/super-admin-settings.module').then(m => m.SuperAdminSettingsModule)
      },
      {
        path: 'super-admin-user-management',
        loadChildren: () => import('./views/super-admin-user-management/super-admin-user-management.module').then(m => m.SuperAdminUserManagementModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./views/admindashboard/admindashboard.module').then(m => m.AdmindashboardModule)
      },
      {
        path: 'pm',
        loadChildren: () => import('./views/pmdashboard/pmdashboard.module').then(m => m.PmdashboardModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./views/userdashboard/userdashboard.module').then(m => m.UserdashboardModule)
      },
      
      {
        path: 'forms',
        loadChildren: () => import('./views/create-forms/create-forms.module').then(m => m.CreateFormsModule)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'lesson',
        loadChildren: () => import('./views/lesson/lesson.module').then(m => m.lessonModule)
      },
      {
        path: 'add-lesson',
        loadChildren: () => import('./views/add-lessons/add-lessons.module').then(m => m.AddLessonsModule)
      },
      {
        path: 'add-lessons-process',
        loadChildren: () => import('./views/add-lessons-process/add-lessons-process.module').then(m => m.AddLessonsProcessModule)
      },
      {
        path: 'view-lesson',
        loadChildren: () => import('./views/view-lessons/view-lessons.module').then(m => m.ViewLessonsModule)
      },
      {
        path: 'viewdatabaseform',
        loadChildren: () => import('./views/viewdatabaseforms/viewdatabaseform.module').then(m => m.ViewdatabaseformModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        path: 'user-management',
        loadChildren: () => import('./views/user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'masterlists',
        loadChildren: () => import('./views/masterlists/masterlists.module').then(m => m.MasterlistsModule)
      },
      {
        path: 'masterlists-Process',
        loadChildren: () => import('./views/masterlist-process/masterlist-process.module').then(m => m.MasterlistProcessModule)
      },
      {
        path: 'howdoi',
        loadChildren: () => import('./views/howdoi/howdoi.module').then(m => m.HowdoiModule)
      },
      {
        path: '404',
        loadChildren: () => import('./views/error/404.module').then(m => m.P404Module)
      },
      {
        path: 'notification',
        loadChildren: () => import('./views/notification/notification.module').then(m => m.NotificationModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      },
      {
        path: 'update-lesson-project/:id',
        loadChildren: () => import('./views/update-lesson-project/update-lesson-project.module').then(m => m.UpdateLessonProjectModule)
      }
    ]
  },
  { path: '**', component: P500Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
