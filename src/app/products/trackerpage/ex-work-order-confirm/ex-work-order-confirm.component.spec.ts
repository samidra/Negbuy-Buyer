import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExWorkOrderConfirmComponent } from './ex-work-order-confirm.component';

describe('ExWorkOrderConfirmComponent', () => {
  let component: ExWorkOrderConfirmComponent;
  let fixture: ComponentFixture<ExWorkOrderConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExWorkOrderConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExWorkOrderConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
