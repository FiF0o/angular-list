import { TestBed, inject } from '@angular/core/testing'
import { HttpClient } from '@angular/common/http';

import { ItemsService } from './items.service';
import { ItemInterface } from './item.model';

import { asyncData } from '../testing/async-observable-helpers'

let httpClientSpy: { get: jasmine.Spy };
let itemsService: ItemsService;

describe('Service: Items', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    itemsService = new ItemsService(<any> httpClientSpy)
  })

  it('should return expected items (HttpClient called once)', () => {
    const expectedItems: ItemInterface[] = [
      {id: 1},
      {id: 2}
    ]
    httpClientSpy.get.and.returnValue(asyncData(expectedItems))

    itemsService.getAll().subscribe(
      items => expect(items).toEqual(expectedItems),
      fail
    )

    expect(httpClientSpy.get.calls.count()).toBe(1)
  })

})