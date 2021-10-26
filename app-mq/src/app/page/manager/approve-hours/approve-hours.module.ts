import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveHoursPageRoutingModule } from './approve-hours-routing.module';

import { ApproveHoursPage } from './approve-hours.page';
import { TabComponentModule } from 'src/app/components/tab/tab.moudle';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveHoursPageRoutingModule,
    TabComponentModule
  ],
  declarations: [ApproveHoursPage]
})
export class ApproveHoursPageModule {}
