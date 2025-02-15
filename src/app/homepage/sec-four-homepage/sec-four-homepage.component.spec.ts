import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecFourHomepageComponent } from './sec-four-homepage.component';

describe('SecFourHomepageComponent', () => {
  let component: SecFourHomepageComponent;
  let fixture: ComponentFixture<SecFourHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecFourHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecFourHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
