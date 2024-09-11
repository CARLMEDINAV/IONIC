import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnirseAPageRoutingModule } from './unirse-a-routing.module';

import { UnirseAPage } from './unirse-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnirseAPageRoutingModule
  ],
  declarations: [UnirseAPage]
})
export class UnirseAPageModule {}
