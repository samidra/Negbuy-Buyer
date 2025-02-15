import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecommendationComponent } from './my-recommendation.component';

describe('MyRecommendationComponent', () => {
  let component: MyRecommendationComponent;
  let fixture: ComponentFixture<MyRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRecommendationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
