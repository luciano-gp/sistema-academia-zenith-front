import { TestBed } from '@angular/core/testing';

import { PersonTrainingService } from './person-training.service';

describe('PersonTrainingService', () => {
  let service: PersonTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
