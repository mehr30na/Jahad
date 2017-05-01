/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TownShipService } from './town-ship.service';

describe('TownShipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TownShipService]
    });
  });

  it('should ...', inject([TownShipService], (service: TownShipService) => {
    expect(service).toBeTruthy();
  }));
});
