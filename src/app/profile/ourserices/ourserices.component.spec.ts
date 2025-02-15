import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OursericesComponent } from './ourserices.component';

describe('OursericesComponent', () => {
  let component: OursericesComponent;
  let fixture: ComponentFixture<OursericesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OursericesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OursericesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
