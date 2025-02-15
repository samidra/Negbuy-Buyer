import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByBrandComponent } from './search-by-brand.component';

describe('SearchByBrandComponent', () => {
  let component: SearchByBrandComponent;
  let fixture: ComponentFixture<SearchByBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
