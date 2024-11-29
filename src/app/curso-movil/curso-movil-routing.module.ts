import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoMovilPage } from './curso-movil.page';

const routes: Routes = [
  {
    path: '',
    component: CursoMovilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoMovilPageRoutingModule {}
