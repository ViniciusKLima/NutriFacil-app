import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroInicialPageRoutingModule } from './cadastro-inicial-routing.module';

import { CadastroInicialPage } from './cadastro-inicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroInicialPageRoutingModule
  ],
  declarations: [CadastroInicialPage]
})
export class CadastroInicialPageModule {}
