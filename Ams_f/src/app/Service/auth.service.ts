import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }) {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        localStorage.setItem('currentUser', JSON.stringify(response));
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user && user.role === 'ADMIN';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}