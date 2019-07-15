import { Component, OnInit } from '@angular/core';
import { ItemInterface } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  currentItem: ItemInterface;
  itemCopy: ItemInterface;

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
    console.log('saved!')
    console.log(this.itemCopy)
  }

  cancelItem(item) {
    this.resetCurrentItem()
  }

  resetCurrentItem() {
    this.currentItem = { id: null, name: '', heading: '', description: '' };
  }
}