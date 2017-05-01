/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AllocatedProductService } from './allocated-product.service';

describe('AllocatedProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllocatedProductService]
    });
  });

  it('should ...', inject([AllocatedProductService], (service: AllocatedProductService) => {
    expect(service).toBeTruthy();
  }));
});
