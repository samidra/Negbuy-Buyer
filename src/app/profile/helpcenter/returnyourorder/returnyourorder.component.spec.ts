import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnyourorderComponent } from './returnyourorder.component';

describe('ReturnyourorderComponent', () => {
  let component: ReturnyourorderComponent;
  let fixture: ComponentFixture<ReturnyourorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnyourorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnyourorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
