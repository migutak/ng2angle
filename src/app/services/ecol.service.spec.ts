import { TestBed } from '@angular/core/testing';

import { EcolService } from './ecol.service';

describe('EcolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EcolService = TestBed.get(EcolService);
    expect(service).toBeTruthy();
  });
});
