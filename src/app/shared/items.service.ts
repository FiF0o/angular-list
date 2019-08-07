import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';

import { ItemInterface } from './item.model';

import { Observable } from 'rxjs';
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

  getAll() {
    return this.http.get<ItemInterface[]>(BASE_URL)
      .pipe(
        catchError(this.handleError('getAll'))
      )
  }

  loadItem(id: number | string) {
    return this.http.get(`${BASE_URL}`)
      .pipe(
        map((items: ItemInterface[]) =>
          // + turns string into number
          items.find(item => item.id === +id)),
          catchError(this.handleError)
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
      .pipe(
        catchError(this.handleError)
        )
  }

}