import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTrainingComponent } from './form-training.component';

describe('FormTrainingComponent', () => {
  let component: FormTrainingComponent;
  let fixture: ComponentFixture<FormTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTrainingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
