import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';

import { ItemsComponent } from './cards/items.components';

import { MatCardModule, MatGridListModule } from '@angular/material';
// console.log(MatCardModule)


@NgModule({
  declarations: [
    ItemsComponent,
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [
    MatCardModule,
    MatGridListModule
  ]
})
export class ItemsModule { }