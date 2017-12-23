import { TestBed, inject } from '@angular/core/testing';

import { TopSalesService } from './top-sales.service';

describe('TopSalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopSalesService]
    });
  });

  it('should be created', inject([TopSalesService], (service: TopSalesService) => {
    expect(service).toBeTruthy();
  }));
});
