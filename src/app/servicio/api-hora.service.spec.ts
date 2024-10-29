import { TestBed } from '@angular/core/testing';

import { ApiHoraService } from './api-hora.service';

describe('ApiHoraService', () => {
  let service: ApiHoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiHoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
