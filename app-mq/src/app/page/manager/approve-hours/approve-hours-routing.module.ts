import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApproveHoursPage } from './approve-hours.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveHoursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveHoursPageRoutingModule {}
