import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

import { ItemInterface } from './item.model';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api/items';
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class ItemsService {
  constructor(private http: HttpClient) {}
  
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
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(`${BASE_URL}/${id}`)
  }
}