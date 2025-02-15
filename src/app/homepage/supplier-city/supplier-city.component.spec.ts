import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCityComponent } from './supplier-city.component';

describe('SupplierCityComponent', () => {
  let component: SupplierCityComponent;
  let fixture: ComponentFixture<SupplierCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierCityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
