/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServiceCenterService } from './service-center.service';

describe('ServiceCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceCenterService]
    });
  });

  it('should ...', inject([ServiceCenterService], (service: ServiceCenterService) => {
    expect(service).toBeTruthy();
  }));
});
