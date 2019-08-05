import { TestBed, inject } from '@angular/core/testing'
import { HttpClient } from '@angular/common/http';

import { ItemsService } from './items.service';

class HttpStub {}

describe('Service: Items', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemsService,
        {
          provide: HttpClient, 
          useClass: HttpStub
        }
      ]
    })
  })

  it('should exist', inject([ItemsService], (service: ItemsService) => {
    expect(service).toBeTruthy();
  }))
})