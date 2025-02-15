import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRfqComponent } from './my-rfq.component';

describe('MyRfqComponent', () => {
  let component: MyRfqComponent;
  let fixture: ComponentFixture<MyRfqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRfqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
