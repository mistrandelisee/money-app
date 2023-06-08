import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VModalComponent } from './v-modal.component';

describe('VModalComponent', () => {
  let component: VModalComponent;
  let fixture: ComponentFixture<VModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
