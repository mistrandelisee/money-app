import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VDatatableHeaderComponent } from './v-datatable-header.component';

describe('VDatatableHeaderComponent', () => {
  let component: VDatatableHeaderComponent;
  let fixture: ComponentFixture<VDatatableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VDatatableHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VDatatableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
