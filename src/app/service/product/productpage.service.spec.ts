import { TestBed } from '@angular/core/testing';

import { ProductpageService } from './productpage.service';

describe('ProductpageService', () => {
  let service: ProductpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
