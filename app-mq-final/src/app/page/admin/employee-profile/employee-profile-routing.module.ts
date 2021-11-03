import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackingPage } from '../tracking/tracking.page';

import { EmployeeProfilePage } from './employee-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeProfilePage,
  },
  {
    path: 'tracking',
    loadChildren: () => import('../tracking/tracking.module').then( m => m.TrackingPageModule)
  },
  {
    path: 'approve-hours',
    loadChildren: () => import('../approve-hours/approve-hours.module').then( m => m.ApproveHoursPageModule)
  },
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeProfilePageRoutingModule {}
