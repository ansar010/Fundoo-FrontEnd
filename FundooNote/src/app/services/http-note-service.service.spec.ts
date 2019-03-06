import { TestBed } from '@angular/core/testing';

import { HttpNoteServiceService } from './http-note-service.service';

describe('HttpNoteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpNoteServiceService = TestBed.get(HttpNoteServiceService);
    expect(service).toBeTruthy();
  });
});
