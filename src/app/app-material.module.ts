import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule
} from '@angular/material';



@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule
  ]
})
export class AppMaterialModule {
}