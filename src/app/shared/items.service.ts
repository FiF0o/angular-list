import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';

import { ItemInterface } from './item.model';

import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable()
export class ItemsService {
  readonly ITEMS_API_URL = 'http://localhost:3000/items/';

  constructor(private http: HttpClient) {}
  
  private log (message: string) {
    console.log('ItemsService: ' + message)
  }

  private handleError<T> (operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `server returned code ${error.status} with body "${error.error}"`;

      throw new Error(`${operation} failed: ${message}`);
    };

  }

  getAll(): Observable<ItemInterface[]> {
    return this.http.get<ItemInterface[]>(`${this.ITEMS_API_URL}`)
      .pipe(
        tap(items => this.log('fetched items')),
        catchError(this.handleError('getAll'))
      ) as Observable<ItemInterface[]>
  }

  loadItem<Data>(id: number | string): Observable<ItemInterface> {
    return this.http.get<ItemInterface[]>(`${this.ITEMS_API_URL}?id=${id}`)
      .pipe(
        map((items: ItemInterface[]) => items[0]),
        tap(item => {
          const searchRes = item ? `fetched` : `did not find`
          this.log(`${searchRes} item id=${JSON.stringify(item)}`)
        }),
        catchError(this.handleError('loadItem'))
      ) as Observable<ItemInterface>
  }

  create(item: ItemInterface): Observable<ItemInterface> {
    console.log('posting', item)
    //TODO Pipe and add catch error
    return this.http.post<ItemInterface>(`${this.ITEMS_API_URL}`, item, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(`${this.ITEMS_API_URL}${id}`)
  }

  search(term: string): Observable<ItemInterface[]>{
    term = term.trim()
    const options = term ?
    { params: new HttpParams().set('q', term) } : {}

    return this.http.get<ItemInterface[]>(`${this.ITEMS_API_URL}`, options)
      .pipe(
        catchError(this.handleError)
        )
  }

}