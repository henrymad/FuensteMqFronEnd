import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildingDetailPageRoutingModule } from './building-detail-routing.module';

import { BuildingDetailPage } from './building-detail.page';
import { CardStaffComponentModule } from 'src/app/components/card-staff/card-profile.module';
import { ToolbarComponentModule } from 'src/app/components/toolbar/toolbar.module';
import { ComponentModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuildingDetailPageRoutingModule,
    CardStaffComponentModule,
    ToolbarComponentModule,
    ComponentModule
  ],
  declarations: [BuildingDetailPage]
})
export class BuildingDetailPageModule {}
