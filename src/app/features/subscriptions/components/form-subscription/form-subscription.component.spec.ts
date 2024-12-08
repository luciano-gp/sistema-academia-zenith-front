import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubscriptionComponent } from './form-subscription.component';

describe('FormSubscriptionComponent', () => {
  let component: FormSubscriptionComponent;
  let fixture: ComponentFixture<FormSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
