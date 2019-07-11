import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatGridListModule,
  MatListModule
} from '@angular/material';



@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatListModule
  ]
})
export class AppMaterialModule {
}