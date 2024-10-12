import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudApiPageRoutingModule } from './crud-api-routing.module';

import { CrudApiPage } from './crud-api.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudApiPageRoutingModule
  ],
  declarations: [CrudApiPage]
})
export class CrudApiPageModule {}
