import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroInicialPage } from './cadastro-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroInicialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroInicialPageRoutingModule {}
