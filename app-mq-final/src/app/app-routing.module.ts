import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'employee/:user',
    loadChildren: () => import('./page/employee/employee.module').then( m => m.EmployeePageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./page/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./page/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'manager',
    loadChildren: () => import('./page/manager/manager.module').then( m => m.ManagerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
