import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocketDetailPageComponent } from './docket-detail-page.component';

describe('DocketDetailPageComponent', () => {
  let component: DocketDetailPageComponent;
  let fixture: ComponentFixture<DocketDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocketDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocketDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
