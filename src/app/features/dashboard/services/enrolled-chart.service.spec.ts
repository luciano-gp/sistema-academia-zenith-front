import { TestBed } from '@angular/core/testing';

import { EnrolledChartService } from './enrolled-chart.service';

describe('EnrolledChartService', () => {
  let service: EnrolledChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrolledChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
