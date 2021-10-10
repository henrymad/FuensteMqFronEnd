import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TotalHoursComponent } from './total-hours.component';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [TotalHoursComponent],
  exports: [TotalHoursComponent]
})
export class TotalHoursComponentModule {}