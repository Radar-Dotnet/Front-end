import { TestBed } from '@angular/core/testing';

import { StoreObserverService } from './store-observer.service';

describe('StoreObserverService', () => {
  let service: StoreObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
