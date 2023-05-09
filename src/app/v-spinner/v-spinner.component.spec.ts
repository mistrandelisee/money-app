import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VSpinnerComponent } from './v-spinner.component';

describe('VSpinnerComponent', () => {
  let component: VSpinnerComponent;
  let fixture: ComponentFixture<VSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
