import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VIconComponent } from './v-icon.component';

describe('VIconComponent', () => {
  let component: VIconComponent;
  let fixture: ComponentFixture<VIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
