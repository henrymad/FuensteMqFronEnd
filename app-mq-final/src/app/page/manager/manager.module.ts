import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerPageRoutingModule } from './manager-routing.module';

import { ManagerPage } from './manager.page';
import { TabComponentModule } from 'src/app/components/tab/tab.moudle';
import { CardProfileComponentModule } from 'src/app/components/card-profile/card-profile.moudule';
import { TotalHoursComponentModule } from 'src/app/components/total-hours/total-hours.module';
import { DataTimeComponentModule } from 'src/app/components/data-time/data-time.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerPageRoutingModule,
    TabComponentModule,
    CardProfileComponentModule,
    TotalHoursComponentModule,
    DataTimeComponentModule,
  ],
  declarations: [ManagerPage]
})
export class ManagerPageModule {}
