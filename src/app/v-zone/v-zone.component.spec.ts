import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VZoneComponent } from './v-zone.component';

describe('VZoneComponent', () => {
  let component: VZoneComponent;
  let fixture: ComponentFixture<VZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
