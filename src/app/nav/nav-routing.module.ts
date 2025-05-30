import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavPage } from './nav.page';

const routes: Routes = [
  {
    path: 'nav',
    component: NavPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'regAgua',
        loadChildren: () =>
          import('../regAgua/regAgua.module').then((m) => m.RegAguaPageModule),
      },
      {
        path: 'dietas',
        loadChildren: () =>
          import('../dietas/dietas.module').then((m) => m.DietasPageModule),
      },
      {
        path: 'config',
        loadChildren: () =>
          import('../config/config.module').then((m) => m.ConfigPageModule),
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('../perfil/perfil.module').then((m) => m.PerfilPageModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/nav/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavPageRoutingModule {}
