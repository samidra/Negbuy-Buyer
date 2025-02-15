import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessIndustrialComponent } from './business-industrial.component';

describe('BusinessIndustrialComponent', () => {
  let component: BusinessIndustrialComponent;
  let fixture: ComponentFixture<BusinessIndustrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessIndustrialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessIndustrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
