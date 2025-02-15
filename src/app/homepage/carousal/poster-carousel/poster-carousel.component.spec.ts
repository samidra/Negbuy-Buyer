import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterCarouselComponent } from './poster-carousel.component';

describe('PosterCarouselComponent', () => {
  let component: PosterCarouselComponent;
  let fixture: ComponentFixture<PosterCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosterCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosterCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
