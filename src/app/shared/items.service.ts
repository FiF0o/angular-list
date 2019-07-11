import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ItemInterface } from './item.model'

const BASE_URL = 'http://localhost:3000/api/items'


@Injectable()
export class ItemsService {
  constructor(private http: HttpClient) {}
  
  all() {
    return this.http.get(BASE_URL)
  }

  getAll() {
    return this.http.get<ItemInterface>(BASE_URL)
  }
}