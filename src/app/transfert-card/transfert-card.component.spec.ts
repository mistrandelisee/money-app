import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertCardComponent } from './transfert-card.component';

describe('TransfertCardComponent', () => {
  let component: TransfertCardComponent;
  let fixture: ComponentFixture<TransfertCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfertCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfertCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
