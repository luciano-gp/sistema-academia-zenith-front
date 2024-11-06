import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultersComponent } from './defaulters.component';

describe('DefaultersComponent', () => {
  let component: DefaultersComponent;
  let fixture: ComponentFixture<DefaultersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
