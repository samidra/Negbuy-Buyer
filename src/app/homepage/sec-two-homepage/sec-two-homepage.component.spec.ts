import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecTwoHomepageComponent } from './sec-two-homepage.component';

describe('SecTwoHomepageComponent', () => {
  let component: SecTwoHomepageComponent;
  let fixture: ComponentFixture<SecTwoHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecTwoHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecTwoHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
