import { TestBed } from '@angular/core/testing';

import { AppManageService } from './app-manage.service';

describe('AppManageService', () => {
  let service: AppManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
