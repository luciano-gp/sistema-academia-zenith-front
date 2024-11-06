import { TestBed } from '@angular/core/testing';

import { DaysChartService } from './days-chart.service';

describe('DaysChartService', () => {
  let service: DaysChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaysChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
