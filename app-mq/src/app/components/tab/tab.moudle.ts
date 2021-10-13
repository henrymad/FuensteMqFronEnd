import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TabComponent } from './tab.component';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [TabComponent],
  exports: [TabComponent]
})
export class TabComponentModule {}