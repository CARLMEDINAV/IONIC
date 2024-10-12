import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudApiPage } from './crud-api.page';

const routes: Routes = [
  {
    path: '',
    component: CrudApiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudApiPageRoutingModule {}
