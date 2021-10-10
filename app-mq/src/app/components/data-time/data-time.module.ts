import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DataTimeComponent } from './data-time.component';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [DataTimeComponent],
  exports: [DataTimeComponent]
})
export class DataTimeComponentModule {}