import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemInterface } from 'src/app/shared';

@Component({
  selector: 'child-list',
  template: `
  <mat-action-list>
    <mat-list-item 
      *ngFor="let item of items"
      (click)="viewItem()"
    >
      <h3 matLine> {{item.name}} </h3>
      <p matLine>
        <span class="demo-2">{{item.description}}</span>
      </p>
      <!-- stop propagation as the even will bubble up -->
      <button 
        mat-icon-button
        aria-label="remove"
        (click)="deleted.emit(item.id); $event.stopPropagation()"
      >
        <mat-icon>delete_outline</mat-icon>
      </button>
    </mat-list-item>
  </mat-action-list>
  `,
  styleUrls: ['child-list.component.css']
})
export class ChildListComponent {
  @Input() items: ItemInterface[]

  @Output() deleted = new EventEmitter()

  viewItem() {
    console.log('clicked view!')
  }
}