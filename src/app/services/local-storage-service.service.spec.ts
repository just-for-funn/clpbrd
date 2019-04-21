import { TestBed } from '@angular/core/testing';

import { LocalStorageServiceService } from './local-storage-service.service';

describe('LocalStorageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalStorageServiceService = TestBed.get(LocalStorageServiceService);
    expect(service).toBeTruthy();
  });
});
