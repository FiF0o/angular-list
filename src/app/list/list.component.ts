import {Component, Output, EventEmitter, OnInit, Input } from "@angular/core";
import { ItemsService, ItemInterface } from '../shared'

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  providers: [ItemsService]
})
export class ListComponent implements OnInit {
  title: string = 'Your list of items'
  @Input() items: ItemInterface[]
  @Output() selected = new EventEmitter()

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.getItems()
  }

  getItems() {
    return this.itemsService.getAll()
      .subscribe(
        (data: ItemInterface[]) =>
          this.items = [...data],
          e => console.error(e)
      )
  }

  deleteItem(id) {
    this.itemsService.delete(id)
      .subscribe(response => {
        // rehydrate and get the latest list
        this.getItems()
      });
  }

}