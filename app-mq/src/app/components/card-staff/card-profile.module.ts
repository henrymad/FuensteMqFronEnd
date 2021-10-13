import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CardStaffComponent } from './card-staff.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [CardStaffComponent],
  exports: [CardStaffComponent]
})
export class CardStaffComponentModule {}