import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { Router } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Auth', () => {
  let service: AuthService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(withFetch()), Router],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
