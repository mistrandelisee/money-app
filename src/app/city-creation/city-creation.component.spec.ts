import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCreationComponent } from './city-creation.component';

describe('CityCreationComponent', () => {
  let component: CityCreationComponent;
  let fixture: ComponentFixture<CityCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
