import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VDatatableComponent } from './v-datatable.component';

describe('VDatatableComponent', () => {
  let component: VDatatableComponent;
  let fixture: ComponentFixture<VDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
