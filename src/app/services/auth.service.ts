import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(
    private userService: UserService, 
    private router: Router,
    private notificationService: NotificationService
  ) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
        console.log('[AUTH SERVICE] User loaded from localStorage:', this.currentUser?.email);
    }
  }

  login(email: string, password: string): Observable<User> {
    console.log('[AUTH SERVICE] Starting login process for email:', email);
    
    return this.userService.authenticateUser(email, password).pipe(
      tap(user => {
        console.log('[AUTH SERVICE] Authentication successful, storing user data');
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('[AUTH SERVICE] User stored in localStorage:', this.currentUser.email);
        this.notificationService.success(`Bienvenue ${user.userName} !`, 'Connexion réussie');
      }),
      catchError((error: any) => {
        console.error('[AUTH SERVICE] Login failed:', error);
        this.notificationService.error(error.message || 'Email ou mot de passe incorrect', 'Échec de connexion');
        return throwError(() => error);
      })
    );
  }

  signup(userName: string, email: string, password: string): Observable<User> {
    console.log('[AUTH SERVICE] Starting signup process for email:', email);
    
    const newUser = { userName, email, password };
    
    return this.userService.createUser(newUser).pipe(
      tap(user => {
        console.log('[AUTH SERVICE] Signup successful, storing user data');
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('[AUTH SERVICE] User stored in localStorage:', this.currentUser.email);
        this.notificationService.success(`Compte créé avec succès ! Bienvenue ${user.userName}`, 'Inscription réussie');
      }),
      catchError((error: any) => {
        console.error('[AUTH SERVICE] Signup failed:', error);
        
        if (error.status === 409) {
          this.notificationService.error('Cet email est déjà utilisé', 'Email existant');
        } else {
          this.notificationService.error(error.message || 'Impossible de créer le compte', 'Échec de l\'inscription');
        }
        
        return throwError(() => error);
      })
    );
  }

  isLoggedIn(): boolean {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUser = storedUser ? JSON.parse(storedUser) : null;
      
      if (this.currentUser) {
        console.log('[AUTH SERVICE] User session retrieved from localStorage:', this.currentUser.email);
      } else {
        console.log('[AUTH SERVICE] No active user session found');
      }
    }
    return !!this.currentUser;
  }

  logout(): void {
    console.log('[AUTH SERVICE] Logging out user:', this.currentUser?.email);
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.notificationService.info('À bientôt !', 'Déconnexion');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
