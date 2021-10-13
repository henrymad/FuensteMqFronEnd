import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildingDetailPageRoutingModule } from './building-detail-routing.module';

import { BuildingDetailPage } from './building-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuildingDetailPageRoutingModule
  ],
  declarations: [BuildingDetailPage]
})
export class BuildingDetailPageModule {}
