import { TestBed } from '@angular/core/testing';

import { CurrentViewService } from './current-view.service';

describe('CurrentViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentViewService = TestBed.get(CurrentViewService);
    expect(service).toBeTruthy();
  });
});
