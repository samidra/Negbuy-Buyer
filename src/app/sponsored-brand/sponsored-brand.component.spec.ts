import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsoredBrandComponent } from './sponsored-brand.component';

describe('SponsoredBrandComponent', () => {
  let component: SponsoredBrandComponent;
  let fixture: ComponentFixture<SponsoredBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsoredBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsoredBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
