import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VOutputFieldsComponent } from './v-output-fields.component';

describe('VOutputFieldsComponent', () => {
  let component: VOutputFieldsComponent;
  let fixture: ComponentFixture<VOutputFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VOutputFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VOutputFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
