import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecFiveHomepageComponent } from './sec-five-homepage.component';

describe('SecFiveHomepageComponent', () => {
  let component: SecFiveHomepageComponent;
  let fixture: ComponentFixture<SecFiveHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecFiveHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecFiveHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
