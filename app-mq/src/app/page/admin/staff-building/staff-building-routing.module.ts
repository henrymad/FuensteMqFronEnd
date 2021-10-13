import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffBuildingPage } from './staff-building.page';

const routes: Routes = [
  {
    path: '',
    component: StaffBuildingPage
  },
  {
    path: 'employee-profile/:username',
    loadChildren: () => import('../employee-profile/employee-profile.module').then( m => m.EmployeeProfilePageModule)
  },
  {
    path: 'building-detail',
    loadChildren: () => import('../building-detail/building-detail.module').then( m => m.BuildingDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffBuildingPageRoutingModule {}
