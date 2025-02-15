import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecThreeHomepageComponent } from './sec-three-homepage.component';

describe('SecThreeHomepageComponent', () => {
  let component: SecThreeHomepageComponent;
  let fixture: ComponentFixture<SecThreeHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecThreeHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecThreeHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
