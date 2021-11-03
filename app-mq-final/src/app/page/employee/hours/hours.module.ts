import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HoursPageRoutingModule } from './hours-routing.module';

import { HoursPage } from './hours.page';
import { DataTimeComponentModule } from 'src/app/components/data-time/data-time.module';
import { ComponentsModule } from './components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HoursPageRoutingModule,
    DataTimeComponentModule,
    ComponentsModule,
  ],
  declarations: [HoursPage]
})
export class HoursPageModule {}
