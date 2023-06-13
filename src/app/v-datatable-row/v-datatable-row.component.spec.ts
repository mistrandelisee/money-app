import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VDatatableRowComponent } from './v-datatable-row.component';

describe('VDatatableRowComponent', () => {
  let component: VDatatableRowComponent;
  let fixture: ComponentFixture<VDatatableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VDatatableRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VDatatableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
