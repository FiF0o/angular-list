import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ItemInterface } from 'src/app/shared';

@Component({
  selector: 'create-item',
  templateUrl: 'create.component.html',
  styleUrls: ['create.component.css']
})
export class CreateItem {
  originalName: string;
  selectedItem: ItemInterface;
  // handlers are being passed down from the 'parent' component when loaded in the view 
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set item(value: ItemInterface) {
    if(value) this.originalName = value.name;
    // cloning object for now so when we edit it we only change the 'copy'
    this.selectedItem = Object.assign({}, value);
  }
}