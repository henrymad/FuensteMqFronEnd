import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CardBuildingComponent } from './card-building.component';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [CardBuildingComponent],
  exports: [CardBuildingComponent]
})
export class CardBuildingComponentModule {}