import { TestBed } from '@angular/core/testing';

import { CrudApiDjangoService } from './crud-api-django.service';

describe('CrudApiDjangoService', () => {
  let service: CrudApiDjangoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudApiDjangoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
