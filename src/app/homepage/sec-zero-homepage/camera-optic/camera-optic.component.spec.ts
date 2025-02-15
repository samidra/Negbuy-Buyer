import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraOpticComponent } from './camera-optic.component';

describe('CameraOpticComponent', () => {
  let component: CameraOpticComponent;
  let fixture: ComponentFixture<CameraOpticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraOpticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraOpticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
