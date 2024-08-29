import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate token correctly', () => {
    const validToken = '980c5c9f-bbf7-444a-8ec7-7e7b09845670';
    const invalidToken = 'invalid-token';

    expect(service.validateToken(validToken)).toBeTrue();
    expect(service.validateToken(invalidToken)).toBeFalse();
  });
});
