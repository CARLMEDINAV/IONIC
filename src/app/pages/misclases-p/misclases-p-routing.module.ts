import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisclasesPPage } from './misclases-p.page';

const routes: Routes = [
  {
    path: '',
    component: MisclasesPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisclasesPPageRoutingModule {}