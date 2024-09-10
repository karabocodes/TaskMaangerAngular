import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) 
  },
  { 
    path: 'tasks', 
    loadComponent: () => import('./task-list/task-list.component').then(m => m.TaskListComponent) 
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) 
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) 
  },
];

// import { Routes } from '@angular/router';
// import { ProfileComponent } from './profile/profile.component';
// import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
// import { TaskListComponent } from './task-list/task-list.component';

// export const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { 
//     path: 'login', 
//     loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) 
//   },
//   { 
//     path: 'register', 
//     loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) 
//   },
//   { 
//     path: 'tasks', 
//     component: TaskListComponent
//   },
//   { 
//     path: 'profile', 
//     component: ProfileComponent
//   },
//   { 
//     path: 'admin', 
//     component: AdminDashboardComponent
//   },
// ];
