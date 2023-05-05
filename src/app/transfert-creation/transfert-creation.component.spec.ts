import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertCreationComponent } from './transfert-creation.component';

describe('TransfertCreationComponent', () => {
  let component: TransfertCreationComponent;
  let fixture: ComponentFixture<TransfertCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfertCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfertCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
