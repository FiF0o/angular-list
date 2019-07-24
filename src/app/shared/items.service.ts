import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';

import { ItemInterface } from './item.model';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const BASE_URL = 'http://localhost:3000/items/';
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class ItemsService {
  constructor(private http: HttpClient) {}
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(`An error occurred:' ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status},\n
        body was: ${JSON.stringify(error.error)}`
        );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later. 😭');
  };

  all() {
    return this.http.get(BASE_URL)
  }

  getAll() {
    return this.http.get<ItemInterface[]>(BASE_URL)
  }

  loadItem(id: number | string) {
    return this.http.get(`${BASE_URL}`)
      .pipe(
        map((items: ItemInterface[]) =>
          // + turns string into number
          items.find(item => item.id === +id))
      )
  }

  create(item: ItemInterface): Observable<ItemInterface> {
    console.log('posting', item)
    //TODO Pipe and add catch error
    return this.http.post<ItemInterface>(`${BASE_URL}`, item, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(`${BASE_URL}${id}`)
  }

  search(term: string): Observable<ItemInterface[]>{
    term = term.trim()
    const options = term ?
    { params: new HttpParams().set('q', term) } : {}

    return this.http.get<ItemInterface[]>(`${BASE_URL}`, options)
  }

}