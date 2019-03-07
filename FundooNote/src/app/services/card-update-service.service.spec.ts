import { TestBed } from '@angular/core/testing';

import { CardUpdateServiceService } from './card-update-service.service';

describe('CardUpdateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardUpdateServiceService = TestBed.get(CardUpdateServiceService);
    expect(service).toBeTruthy();
  });
});
