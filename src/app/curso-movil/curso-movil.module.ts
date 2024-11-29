import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoMovilPageRoutingModule } from './curso-movil-routing.module';

import { CursoMovilPage } from './curso-movil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursoMovilPageRoutingModule
  ],
  declarations: [CursoMovilPage]
})
export class CursoMovilPageModule {}
