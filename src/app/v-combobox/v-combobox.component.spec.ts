import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VComboboxComponent } from './v-combobox.component';

describe('VComboboxComponent', () => {
  let component: VComboboxComponent;
  let fixture: ComponentFixture<VComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VComboboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
