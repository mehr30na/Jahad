/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VillageService } from './village.service';

describe('VillageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VillageService]
    });
  });

  it('should ...', inject([VillageService], (service: VillageService) => {
    expect(service).toBeTruthy();
  }));
});
