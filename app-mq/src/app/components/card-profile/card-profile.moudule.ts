import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CardProfileComponent } from './card-profile.component';



@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [CardProfileComponent],
  exports: [CardProfileComponent]
})
export class CardProfileComponentModule {}