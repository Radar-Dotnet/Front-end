import { TestBed } from '@angular/core/testing';

import { InterceptorTokenInterceptor } from './interceptor-token.interceptor';

describe('InterceptorTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InterceptorTokenInterceptor = TestBed.inject(InterceptorTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
