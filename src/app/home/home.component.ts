import { Component, OnInit } from '@angular/core';
import { ItemInterface, ItemsService } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ItemsService]
})
export class HomeComponent implements OnInit {
  currentItem: ItemInterface;
  itemCopy: ItemInterface;
  items: ItemInterface[]

  constructor(
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    // if we don't set the item to null in the form
    // angular complains as the 2-ways binding is undefined
    // setting a prop [item] to be passed down in the form
    this.resetCurrentItem();
  }

  saveItem(item) {
    // temporary, creating a 'unique number'
    this.itemCopy = Object.assign({}, item, {
      id: Math.floor(Math.random() * 1000),
    })
    this.itemsService.create(this.itemCopy)
      .subscribe(response =>{
        console.log(JSON.stringify(response), 'saved!')
        // rehydrate state with new items and reset current item text fields
        this.itemsService.getAll()
        this.resetCurrentItem()
      })
  }

  cancelItem(item) {
    this.resetCurrentItem()
  }

  resetCurrentItem() {
    this.currentItem = { id: null, name: '', heading: '', description: '' };
  }

  selectItem(item) {
    this.currentItem = item
  }

  handleResults(items) {
    this.items = items
  }
}