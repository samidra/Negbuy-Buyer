import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparelAccessoriesComponent } from './apparel-accessories.component';

describe('ApparelAccessoriesComponent', () => {
  let component: ApparelAccessoriesComponent;
  let fixture: ComponentFixture<ApparelAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApparelAccessoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApparelAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
