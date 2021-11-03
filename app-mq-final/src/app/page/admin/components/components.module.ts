import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TabAdminComponent } from './tab-admin/tab-admin.component';



@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [TabAdminComponent],
  exports: [TabAdminComponent]
})
export class ComponentModule {}