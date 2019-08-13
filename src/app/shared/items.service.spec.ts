import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

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

  it('should return the expected item when loadItem() is called with an item id', () => {
    const expectedItem = {
      id: 1
    }
    const mockData = [
      {id: 1},
      {id: 2}
    ]

    httpClientSpy.get.and.returnValue(asyncData(mockData));

    itemsService.loadItem(expectedItem.id).subscribe(
      item => expect(item).toEqual(expectedItem),
      fail
    );
  });

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

  describe('HeroesService (with mocks)', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let itemsService: ItemsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        // Import the HttpClient mocking services
        imports: [ HttpClientTestingModule ],
        // Provide the service-under-test
        providers: [ ItemsService ]
      });

      // Inject the http, test controller, and service-under-test
      // as they will be referenced by each test.
      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
      itemsService = TestBed.get(ItemsService);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    describe('getAll()', () => {
      let expectedItems: ItemInterface[]

      beforeEach(() => {
        itemsService = TestBed.get(ItemsService);
        expectedItems = [
          { id: 1, name: 'A' },
          { id: 2, name: 'B' },
         ] as ItemInterface[];
      });

      it('should return expected items (called once)', () => {
        itemsService.getAll().subscribe(
          items => expect(items).toEqual(expectedItems, 'should return expected items'),
          fail
        );

        // ItemsService should have made one request to GET items from expected URL
        const req = httpTestingController.expectOne(itemsService.ITEMS_API_URL);
        expect(req.request.method).toEqual('GET');

        // Respond with the mock items
        req.flush(expectedItems);
      });

    })

  })

})