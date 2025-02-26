import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingUpUser } from '../interfaces/auth';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from '../config/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.API_BASE_URL}/auth`;
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.tokenSubject.next(storedToken);
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.authUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('id', response.id);
            localStorage.setItem('name', response.name);
            localStorage.setItem('role', response.role);
            localStorage.setItem('token', response.token);
            this.tokenSubject.next(response.token);
          }
        })
      );
  }

  register(userDetails: SingUpUser) {
    return this.http.post<User>(`${this.authUrl}/signup`, userDetails);
  }

  logout(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }
}
