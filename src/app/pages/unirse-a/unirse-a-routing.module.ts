import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnirseAPage } from './unirse-a.page'; // Verifica que esto sea correcto

const routes: Routes = [
  {
    path: '',
    component: UnirseAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnirseAPageRoutingModule {}
