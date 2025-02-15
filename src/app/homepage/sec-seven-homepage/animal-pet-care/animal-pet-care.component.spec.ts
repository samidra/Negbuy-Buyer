import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalPetCareComponent } from './animal-pet-care.component';

describe('AnimalPetCareComponent', () => {
  let component: AnimalPetCareComponent;
  let fixture: ComponentFixture<AnimalPetCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalPetCareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalPetCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
