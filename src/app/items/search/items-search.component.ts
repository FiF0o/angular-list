import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { ItemsService } from 'src/app/shared';
import { fromEvent, timer } from 'rxjs';
import { debounce, distinctUntilChanged, map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-search-items',
  templateUrl: './items-search.component.html',
  styleUrls: ['./items-search.component.css'],
  providers: [ItemsService] 
})
export class ItemsSearchComponent implements OnInit {
  // creates element dom reference (#itemsSearch) from template 
  @ViewChild('itemsSearch', {static: true}) itemsSearch : ElementRef
  @Output() onResults = new EventEmitter()

  constructor(
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    const el = this.getNativeElement(this.itemsSearch)
    // create Observable output stream from key
    const search$ = fromEvent(el, 'keyup')
      // transform pipe
      .pipe(
        debounce(() => timer(1000)),
        distinctUntilChanged(),
        // only grabbing the text field value from observable input el
        map((event: any) => event.target.value),
        switchMap(searchQuery => this.itemsService.search(searchQuery))
      )

      // suscribe to receive input and consume it.
      // We are sending back to the parent component to update our lists in home
      search$.subscribe(
        searchResult => this.onResults.emit(searchResult)
      )
    }
    
    getNativeElement(element) {
      return element.nativeElement;
    }
    
}