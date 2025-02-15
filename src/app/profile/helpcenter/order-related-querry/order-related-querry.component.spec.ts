import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRelatedQuerryComponent } from './order-related-querry.component';

describe('OrderRelatedQuerryComponent', () => {
  let component: OrderRelatedQuerryComponent;
  let fixture: ComponentFixture<OrderRelatedQuerryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRelatedQuerryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderRelatedQuerryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
