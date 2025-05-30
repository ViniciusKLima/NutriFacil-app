import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DietasPage } from './dietas.page';
import { DietasPageRoutingModule } from './dietas-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, DietasPageRoutingModule],
  declarations: [DietasPage],
})
export class DietasPageModule {}
