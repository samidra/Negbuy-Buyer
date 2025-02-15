import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGardensComponent } from './home-gardens.component';

describe('HomeGardensComponent', () => {
  let component: HomeGardensComponent;
  let fixture: ComponentFixture<HomeGardensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGardensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGardensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
