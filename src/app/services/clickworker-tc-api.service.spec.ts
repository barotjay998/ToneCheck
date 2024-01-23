import { TestBed } from '@angular/core/testing';

import { ClickworkerTcApiService } from './clickworker-tc-api.service';

describe('ClickworkerTcApiService', () => {
  let service: ClickworkerTcApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickworkerTcApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
