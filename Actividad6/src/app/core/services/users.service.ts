import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/users';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  // API
  private baseUrl = '/api/users';  

getUsers(): Observable<User[]> {
  return this.http.get<any>(this.baseUrl).pipe(
    map(res => {
      if (Array.isArray(res)) return res as User[];
      if (Array.isArray(res?.results)) return res.results as User[];
      if (Array.isArray(res?.data)) return res.data as User[];
      return [];
    })
  );
}


  getUser(id: number): Observable<User> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(res => (res?.data ? res.data as User : (res as User)))
    );
  }

  createUser(payload: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, payload);
  }

  updateUser(id: number, payload: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, payload);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
