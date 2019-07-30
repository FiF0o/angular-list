import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';

import { ItemsComponent } from './cards/items.components';

import { MatCardModule, MatGridListModule, MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [
    ItemsComponent,
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule
  ],
  exports: [
    MatCardModule,
    MatGridListModule,
    MatButtonModule
  ]
})
export class ItemsModule { }