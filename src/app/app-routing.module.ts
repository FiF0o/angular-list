import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ItemsDetailsComponent } from './items/details/item.component';
import { ListComponent } from './list/list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: 'items',
    loadChildren: () => import('./items/items.module')
      .then(mod => mod.ItemsModule)
  },
  // TODO To be moved in ItemsModule when lazy loading
  { path: 'item/:id', component: ItemsDetailsComponent },
  { path: 'list', component: ListComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule {
}