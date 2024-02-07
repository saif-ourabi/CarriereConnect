import { TestBed } from '@angular/core/testing';

import { CadidatureService } from './candidature.service';

describe('CadidatureService', () => {
  let service: CadidatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadidatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
