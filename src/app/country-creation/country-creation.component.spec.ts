import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCreationComponent } from './country-creation.component';

describe('CountryCreationComponent', () => {
  let component: CountryCreationComponent;
  let fixture: ComponentFixture<CountryCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
