import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciasAPage } from './asistencias-a.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciasAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciasAPageRoutingModule {}
