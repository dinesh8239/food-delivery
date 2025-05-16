import { Component } from '@angular/core';

// @Component({
//   selector: 'app-auth',
//   imports: [],
//   // templateUrl: './auth.component.html',
//   // styleUrl: './auth.component.css'
// })
export class AuthComponent {

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/user'; // adjust if needed

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((res: any) => {
        const { accessToken, refreshToken, user } = res?.data || {};

        if (accessToken && refreshToken && user) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
    );
  }

  logOut(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/logOut`, data)
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
}
