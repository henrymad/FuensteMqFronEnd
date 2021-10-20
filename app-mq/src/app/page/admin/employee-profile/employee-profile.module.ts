import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeProfilePageRoutingModule } from './employee-profile-routing.module';

import { EmployeeProfilePage } from './employee-profile.page';
import { DataTimeComponentModule } from 'src/app/components/data-time/data-time.module';
import { TotalHoursComponentModule } from 'src/app/components/total-hours/total-hours.module';
import { CardProfileComponentModule } from 'src/app/components/card-profile/card-profile.moudule';
import { ComponentModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeProfilePageRoutingModule,
    DataTimeComponentModule,
    TotalHoursComponentModule,
    CardProfileComponentModule,
    ComponentModule
  ],
  declarations: [EmployeeProfilePage]
})
export class EmployeeProfilePageModule {}
