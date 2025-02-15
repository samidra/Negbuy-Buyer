import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportGoodComponent } from './sport-good.component';

describe('SportGoodComponent', () => {
  let component: SportGoodComponent;
  let fixture: ComponentFixture<SportGoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportGoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
