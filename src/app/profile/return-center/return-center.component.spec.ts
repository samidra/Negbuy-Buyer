import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCenterComponent } from './return-center.component';

describe('ReturnCenterComponent', () => {
  let component: ReturnCenterComponent;
  let fixture: ComponentFixture<ReturnCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
