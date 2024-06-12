import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private userService: UserService, private router: Router) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
    }
  }

  login(email: string, password: string): Observable<User | null> {
    return this.userService.authenticateUser(email, password).pipe(
      map(user => {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user)); // Stocker les informations de l'utilisateur dans le localStorage
        console.log('User stored in AuthService:', this.currentUser);  // Debugging line
        this.router.navigate(['/']);
        return user;
      }),
      catchError(error => {
        console.error('Login error', error);
        return of(null);  // Return null in case of error
      })
    );
  }

  signup(userName: string, email: string, password: string): Observable<User> {
    const newUser = { userName, email, password };
    return this.userService.createUser(newUser).pipe(
      map(user => {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user)); // Stocker les informations de l'utilisateur dans le localStorage
        console.log('User signed up and stored in AuthService:', this.currentUser);  // Debugging line
        return user;
      }),
      catchError(error => {
        console.error('Signup error', error);
        throw 'Signup failed';
      })
    );
  }

  isLoggedIn(): boolean {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    }
    return !!this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser'); // Supprimer les informations de l'utilisateur du localStorage
    this.router.navigate(['/login']); // Redirect after logout
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
