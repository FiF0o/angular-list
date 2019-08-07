import { HttpErrorResponse } from '@angular/common/http';

import { ItemsService } from './items.service';
import { ItemInterface } from './item.model';

import { asyncData, asyncError } from '../testing/async-observable-helpers'

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

  it('should return an error when the server returns a 404', () => {
    const expectedError = 'test 404 error'
    const errorResponse = new HttpErrorResponse({
      error: expectedError,
      status: 404,
      statusText: '💩'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    itemsService.getAll().subscribe(
      _ => fail('expected an error, not heroes'),
      error  => expect(error.message).toContain(expectedError)
    );
  });

})