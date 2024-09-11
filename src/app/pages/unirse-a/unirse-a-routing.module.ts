import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnirseAPage } from './unirse-a.page';

const routes: Routes = [
  {
    path: '',
    component: UnirseAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnirseAPageRoutingModule {}
