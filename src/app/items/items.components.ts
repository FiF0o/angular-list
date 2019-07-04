import { Component, OnInit } from '@angular/core';

import { ItemInterface } from '../shared/item.model';
import { ItemsService } from '../shared/items.service';

@Component({
  selector: 'items-component',
  templateUrl: 'items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [ItemsService]
})

export class ItemsComponent implements OnInit {
  items: ItemInterface[];

  constructor(private itemsService: ItemsService) {}
  
  ngOnInit() {
    this.getItems()
  }

  getItems() {
    return this.itemsService.all()
      .subscribe((data: ItemInterface[])  => {
        this.items = [...data]
      })
  }
}