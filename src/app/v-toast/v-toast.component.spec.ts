import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VToastComponent } from './v-toast.component';

describe('VToastComponent', () => {
  let component: VToastComponent;
  let fixture: ComponentFixture<VToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VToastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
