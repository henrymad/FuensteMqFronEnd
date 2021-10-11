import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HoursComponent } from './hours/total-hours.component';
import { TableHoursComponent } from './table-hours/table-hours.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [HoursComponent, TableHoursComponent],
  exports: [HoursComponent,TableHoursComponent]
})
export class ComponentsModule {}