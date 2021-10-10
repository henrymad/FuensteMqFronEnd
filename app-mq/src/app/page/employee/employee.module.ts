import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeePageRoutingModule } from './employee-routing.module';

import { EmployeePage } from './employee.page';
import { CardProfileComponentModule } from 'src/app/components/card-profile/card-profile.moudule';
import { TotalHoursComponentModule } from 'src/app/components/total-hours/total-hours.module';
import { DataTimeComponentModule } from 'src/app/components/data-time/data-time.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeePageRoutingModule,
    CardProfileComponentModule,
    TotalHoursComponentModule,
    DataTimeComponentModule,
    ComponentsModule
  ],
  declarations: [EmployeePage],
})
export class EmployeePageModule {}
