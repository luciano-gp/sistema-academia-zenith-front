import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularsComponent } from './regulars.component';

describe('RegularsComponent', () => {
  let component: RegularsComponent;
  let fixture: ComponentFixture<RegularsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegularsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegularsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
