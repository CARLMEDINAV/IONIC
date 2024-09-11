import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciasAPageRoutingModule } from './asistencias-a-routing.module';

import { AsistenciasAPage } from './asistencias-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciasAPageRoutingModule
  ],
  declarations: [AsistenciasAPage]
})
export class AsistenciasAPageModule {}