import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveHoursPageRoutingModule } from './approve-hours-routing.module';

import { ApproveHoursPage } from './approve-hours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveHoursPageRoutingModule
  ],
  declarations: [ApproveHoursPage]
})
export class ApproveHoursPageModule {}
