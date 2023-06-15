import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VOutputFieldComponent } from './v-output-field.component';

describe('VOutputFieldComponent', () => {
  let component: VOutputFieldComponent;
  let fixture: ComponentFixture<VOutputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VOutputFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VOutputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
