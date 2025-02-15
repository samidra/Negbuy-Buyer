import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceOrderComponent } from './invoice-order.component';

describe('InvoiceOrderComponent', () => {
  let component: InvoiceOrderComponent;
  let fixture: ComponentFixture<InvoiceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
