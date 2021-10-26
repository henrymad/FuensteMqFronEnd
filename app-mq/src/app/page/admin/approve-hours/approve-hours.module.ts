import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveHoursPageRoutingModule } from './approve-hours-routing.module';

import { ApproveHoursPage } from './approve-hours.page';
import { ComponentModule } from '../../admin/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveHoursPageRoutingModule,
    ComponentModule
  ],
  declarations: [ApproveHoursPage]
})
export class ApproveHoursPageModule {}
