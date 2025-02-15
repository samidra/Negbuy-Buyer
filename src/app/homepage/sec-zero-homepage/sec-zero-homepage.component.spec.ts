import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecZeroHomepageComponent } from './sec-zero-homepage.component';

describe('SecZeroHomepageComponent', () => {
  let component: SecZeroHomepageComponent;
  let fixture: ComponentFixture<SecZeroHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecZeroHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecZeroHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
