import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffBuildingPageRoutingModule } from './staff-building-routing.module';

import { StaffBuildingPage } from './staff-building.page';
import { ToolbarComponentModule } from 'src/app/components/toolbar/toolbar.module';
import { TabComponentModule } from 'src/app/components/tab/tab.moudle';
import { CardStaffComponentModule } from 'src/app/components/card-staff/card-profile.module';
import { CardBuildingComponentModule } from 'src/app/components/card-building/card-building.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffBuildingPageRoutingModule,
    ToolbarComponentModule,
    TabComponentModule,
    CardStaffComponentModule,
    CardBuildingComponentModule
  ],
  declarations: [StaffBuildingPage]
})
export class StaffBuildingPageModule {}
