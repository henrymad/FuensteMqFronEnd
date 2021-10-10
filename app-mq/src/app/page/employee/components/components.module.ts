import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StartShiftComponent } from './start-shift/start-shift.component';
import { ClockInComponent } from './clock-in/clock-in.component';
import { ClockOutComponent } from './clock-out/clock-out.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [StartShiftComponent, ClockInComponent, ClockOutComponent],
  exports: [StartShiftComponent, ClockInComponent, ClockOutComponent]
})
export class ComponentsModule {}