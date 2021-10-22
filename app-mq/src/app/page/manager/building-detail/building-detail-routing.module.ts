import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingDetailPage } from './building-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BuildingDetailPage
  },
  {
    path: ':profile/:username',
    loadChildren: () => import('../employee-profile/employee-profile.module').then( m => m.EmployeeProfilePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingDetailPageRoutingModule {}
