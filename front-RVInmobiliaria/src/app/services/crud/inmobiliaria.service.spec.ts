import { TestBed } from '@angular/core/testing';

import { InmobiliariaService } from './inmobiliaria.service';

describe('InmobiliariaService', () => {
  let service: InmobiliariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InmobiliariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
