import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisclasesPPageRoutingModule } from './misclases-p-routing.module';

import { MisclasesPPage } from './misclases-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisclasesPPageRoutingModule
  ],
  declarations: [MisclasesPPage]
})
export class MisclasesPPageModule {}