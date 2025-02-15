import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthBeatuyComponent } from './health-beatuy.component';

describe('HealthBeatuyComponent', () => {
  let component: HealthBeatuyComponent;
  let fixture: ComponentFixture<HealthBeatuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthBeatuyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthBeatuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
