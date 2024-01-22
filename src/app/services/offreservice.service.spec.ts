import { TestBed } from '@angular/core/testing';

import { OffreserviceService } from './offreservice.service';

describe('OffreserviceService', () => {
  let service: OffreserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffreserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
