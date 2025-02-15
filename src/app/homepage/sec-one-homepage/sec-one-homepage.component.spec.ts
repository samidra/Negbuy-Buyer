import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecOneHomepageComponent } from './sec-one-homepage.component';

describe('SecOneHomepageComponent', () => {
  let component: SecOneHomepageComponent;
  let fixture: ComponentFixture<SecOneHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecOneHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecOneHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
