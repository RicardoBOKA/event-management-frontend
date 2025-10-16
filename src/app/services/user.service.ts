import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
    console.log('[USER SERVICE] Creating user with email:', user.email);
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap(createdUser => {
        console.log('[USER SERVICE] User created successfully:', createdUser);
      }),
      catchError(this.handleError)
    );
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
    console.log('[USER SERVICE] Authenticating user with email:', email);
    return this.http.post<User>(`${this.apiUrl}/authenticate`, { email, password }).pipe(
      tap(user => {
        console.log('[USER SERVICE] Authentication successful for user:', user.userId);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('[USER SERVICE] HTTP Error:', error);
    
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('[USER SERVICE] Client-side error:', error.error.message);
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      console.error(`[USER SERVICE] Server returned code ${error.status}, body:`, error.error);
      
      switch (error.status) {
        case 400:
          errorMessage = error.error || 'Données invalides';
          break;
        case 401:
          errorMessage = 'Email ou mot de passe incorrect';
          break;
        case 404:
          errorMessage = 'Utilisateur non trouvé';
          break;
        case 409:
          errorMessage = error.error || 'Un utilisateur avec cet email existe déjà';
          break;
        case 500:
          errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
          break;
        default:
          errorMessage = `Erreur ${error.status}: ${error.error || 'Erreur inconnue'}`;
      }
    }
    
    return throwError(() => ({ status: error.status, message: errorMessage }));
  }

  signup(newUser: NewUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, newUser);
  }
}
