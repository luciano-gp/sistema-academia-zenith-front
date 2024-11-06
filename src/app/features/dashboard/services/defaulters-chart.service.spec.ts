import { TestBed } from '@angular/core/testing';

import { DefaultersChartService } from './defaulters-chart.service';

describe('DefaultersChartService', () => {
  let service: DefaultersChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultersChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
