import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAPage } from './home-a.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAPageRoutingModule {}
