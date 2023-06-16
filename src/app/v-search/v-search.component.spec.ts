import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VSearchComponent } from './v-search.component';

describe('VSearchComponent', () => {
  let component: VSearchComponent;
  let fixture: ComponentFixture<VSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
