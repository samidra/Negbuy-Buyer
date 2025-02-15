import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyToddlerComponent } from './baby-toddler.component';

describe('BabyToddlerComponent', () => {
  let component: BabyToddlerComponent;
  let fixture: ComponentFixture<BabyToddlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BabyToddlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BabyToddlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
