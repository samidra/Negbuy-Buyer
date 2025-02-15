import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectroniEquipmentComponent } from './electroni-equipment.component';

describe('ElectroniEquipmentComponent', () => {
  let component: ElectroniEquipmentComponent;
  let fixture: ComponentFixture<ElectroniEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectroniEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectroniEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
