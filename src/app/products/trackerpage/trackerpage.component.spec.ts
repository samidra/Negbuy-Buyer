import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerpageComponent } from './trackerpage.component';

describe('TrackerpageComponent', () => {
  let component: TrackerpageComponent;
  let fixture: ComponentFixture<TrackerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
