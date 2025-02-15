import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsliderComponent } from './animalslider.component';

describe('AnimalsliderComponent', () => {
  let component: AnimalsliderComponent;
  let fixture: ComponentFixture<AnimalsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalsliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
