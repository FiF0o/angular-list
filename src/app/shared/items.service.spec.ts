import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ItemsService } from './items.service';
import { ItemInterface } from './item.model';

import { asyncData, asyncError } from '../testing/async-observable-helpers'



describe('Service: Items', () => {


  describe('ItemsService (with stubs and spies)', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let itemsService: ItemsService;

    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
      itemsService = new ItemsService(<any> httpClientSpy)
    })

    describe('getAll()', () => {
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

      it('should return the expected item when loadItem() is called with an item id', (done) => {
        const expectedItem = {
          id: 1
        }
        const mockData = [
          {id: 1},
          {id: 2}
        ]

        httpClientSpy.get.and.returnValue(asyncData(mockData));

        itemsService.loadItem(expectedItem.id).subscribe(
          item => {
            expect(item).toEqual(expectedItem)
            done()
          },
          fail
        );
      });

      it('should return an error when the server returns a 404', (done) => {
        const expectedError = 'test 404 error'
        const errorResponse = new HttpErrorResponse({
          error: expectedError,
          status: 404,
          statusText: '💩'
        });

        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        itemsService.getAll().subscribe(
          _ => fail('expected an error, not heroes'),
          error  => {
            expect(error.message).toContain(expectedError)
            done()
          }
        );
      });

    })
  })


  describe('ItemsService (with mocks)', () => {
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

      it('should return no items', () => {
        itemsService.getAll().subscribe(
          items => expect(items.length).toEqual(0),
          fail
        )

        // Sending and empty response
        httpTestingController.expectOne(itemsService.ITEMS_API_URL)
        .flush([])
      })

      it('should return an user friendly message when there is a 404 status code', () => {
        const expectedErrorMessage = 'Ouch 404'

        itemsService.getAll().subscribe(
          items => fail('💥 error'),
          error => expect(error.message).toContain(expectedErrorMessage)
        )

        const req = httpTestingController.expectOne(itemsService.ITEMS_API_URL)
        req.flush(expectedErrorMessage, {status: 404, statusText: 'Not Found'})
      })

      it('should return expected itemss when called multiple times', () => {
        const expectedSingleResponse = [{id: 1}]

        itemsService.getAll().subscribe()
        itemsService.getAll().subscribe(
          item => expect(item).toEqual(expectedSingleResponse),
          fail
        )
        itemsService.getAll().subscribe(
          items => expect(items).toEqual(expectedItems),
          fail
        )

        const requests = httpTestingController.match(itemsService.ITEMS_API_URL)

        requests[0].flush([])
        requests[1].flush(expectedSingleResponse)
        requests[2].flush(expectedItems)
        expect(requests.length).toEqual(3);
      })

    })

  })


})