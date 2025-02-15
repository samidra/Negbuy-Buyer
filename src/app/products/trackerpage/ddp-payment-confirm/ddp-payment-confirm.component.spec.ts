import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdpPaymentConfirmComponent } from './ddp-payment-confirm.component';

describe('DdpPaymentConfirmComponent', () => {
  let component: DdpPaymentConfirmComponent;
  let fixture: ComponentFixture<DdpPaymentConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdpPaymentConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DdpPaymentConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
