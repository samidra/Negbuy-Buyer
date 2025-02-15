import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecSevenHomepageComponent } from './sec-seven-homepage.component';

describe('SecSevenHomepageComponent', () => {
  let component: SecSevenHomepageComponent;
  let fixture: ComponentFixture<SecSevenHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecSevenHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecSevenHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
