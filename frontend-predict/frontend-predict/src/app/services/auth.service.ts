import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:5000';
  private tokenKey = 'access_token';
  isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ message: string, access_token: string }>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.access_token);
        this.isLoggedIn$.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn$.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}
