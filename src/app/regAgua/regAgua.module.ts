import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegAguaPage } from './regAgua.page';

import { RegAguaPageRoutingModule } from './regAgua-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, RegAguaPageRoutingModule],
  declarations: [RegAguaPage],
})
export class RegAguaPageModule {}
