import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerPage } from './manager.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerPage
  },
  {
    path: ':value',
    loadChildren: () => import('./staff-building/staff-building.module').then( m => m.StaffBuildingPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerPageRoutingModule {}
