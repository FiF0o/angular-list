import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ItemInterface, ItemsService } from 'src/app/shared';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


const template = `
  <mat-card
    class="example-card"
    *ngIf="item$ | async as item"
    id="{{item.id}}"
  >
    <mat-card-header class="mat-card-header">
      <div class="example-header-image mat-card-avatar" mat-card-avatar></div>
      <mat-card-title>{{item.name}}</mat-card-title>
      <mat-card-subtitle>{{item.heading}}</mat-card-subtitle>
    </mat-card-header>
    <img mat-card-image src="https://material.angular.io/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu">
    <mat-card-content>
      <p>
        {{item.description}}
      </p>
    </mat-card-content>
  </mat-card>
`

@Component({
  selector: 'item-detail',
  template,
  styleUrls: ['item.component.css'],
  providers: [ItemsService]
})

export class ItemsDetailsComponent implements OnInit {
  item$: Observable<ItemInterface>;

  constructor(
    private itemsService: ItemsService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.item$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
        this.itemsService.loadItem(params.get('id'))
      )
    )
  }
}