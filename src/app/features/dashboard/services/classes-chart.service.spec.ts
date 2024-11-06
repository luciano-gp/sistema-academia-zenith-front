import { TestBed } from '@angular/core/testing';

import { ClassesChartService } from './classes-chart.service';

describe('ClassesChartService', () => {
  let service: ClassesChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassesChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
