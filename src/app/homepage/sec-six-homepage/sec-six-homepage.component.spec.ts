import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecSixHomepageComponent } from './sec-six-homepage.component';

describe('SecSixHomepageComponent', () => {
  let component: SecSixHomepageComponent;
  let fixture: ComponentFixture<SecSixHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecSixHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecSixHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
