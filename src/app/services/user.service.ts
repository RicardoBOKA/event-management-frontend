import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { NewUser } from '../models/newUser.model';
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${env.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  // createUser(user: User): Observable<User> {
  //   return this.http.post<User>(this.apiUrl, user);
  // }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  findUsersByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search/by-username?username=${username}`);
  }

  findUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/search/by-email?email=${email}`);
  }

  authenticateUser(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/authenticate`, { email, password });
  }

  signup(newUser: NewUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, newUser);
  }
}
