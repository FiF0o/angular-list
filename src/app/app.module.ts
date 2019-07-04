import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';

import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.components';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    ItemsComponent
  ],

  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppMaterialModule,
    AppRoutingModule,
    HttpClientModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {}
}
