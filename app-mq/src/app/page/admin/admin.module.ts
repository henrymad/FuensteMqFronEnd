import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { CardProfileComponentModule } from 'src/app/components/card-profile/card-profile.moudule';
import { TotalHoursComponentModule } from 'src/app/components/total-hours/total-hours.module';
import { DataTimeComponentModule } from 'src/app/components/data-time/data-time.module';
import { TabComponentModule } from 'src/app/components/tab/tab.moudle';
import { ComponentModule } from './components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    CardProfileComponentModule,
    TotalHoursComponentModule,
    DataTimeComponentModule,
    TabComponentModule,
    ComponentModule
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
