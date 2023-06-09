import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VFormItemComponent } from './v-form-item.component';

describe('VFormItemComponent', () => {
  let component: VFormItemComponent;
  let fixture: ComponentFixture<VFormItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VFormItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
