import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../config/environments';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private userUrl = `${environment.API_BASE_URL}/users`;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '?offset=0');
  }
}
