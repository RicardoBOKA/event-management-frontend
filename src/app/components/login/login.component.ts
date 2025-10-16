import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { env } from '../../../env/env';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class LoginComponent implements OnInit {
  private url = `${env.apiUrl}/v1`

  loginForm: FormGroup;
  signupForm: FormGroup;
  
  isLoginLoading = false;
  isSignupLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    console.log('[LOGIN COMPONENT] Initializing login component');
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

    // Getters for loginForm controls
    get loginEmail(): AbstractControl | null {
      return this.loginForm.get('email');
    }
    
    get loginPassword(): AbstractControl | null {
      return this.loginForm.get('password');
    }
    
    // Getters for signupForm controls
    get signupName(): AbstractControl | null {
      return this.signupForm.get('name');
    }
    
    get signupEmail(): AbstractControl | null {
      return this.signupForm.get('email');
    }
    
    get signupPassword(): AbstractControl | null {
      return this.signupForm.get('password');
    }
    
    // Helper methods for error messages
    getLoginEmailError(): string {
      const control = this.loginEmail;
      if (control?.hasError('required')) {
        return 'L\'email est obligatoire';
      }
      if (control?.hasError('email')) {
        return 'Format d\'email invalide';
      }
      return '';
    }
    
    getLoginPasswordError(): string {
      const control = this.loginPassword;
      if (control?.hasError('required')) {
        return 'Le mot de passe est obligatoire';
      }
      if (control?.hasError('minlength')) {
        return 'Le mot de passe doit contenir au moins 6 caractères';
      }
      return '';
    }
    
    getSignupNameError(): string {
      const control = this.signupName;
      if (control?.hasError('required')) {
        return 'Le nom d\'utilisateur est obligatoire';
      }
      if (control?.hasError('minlength')) {
        return 'Le nom doit contenir au moins 2 caractères';
      }
      return '';
    }
    
    getSignupEmailError(): string {
      const control = this.signupEmail;
      if (control?.hasError('required')) {
        return 'L\'email est obligatoire';
      }
      if (control?.hasError('email')) {
        return 'Format d\'email invalide';
      }
      return '';
    }
    
    getSignupPasswordError(): string {
      const control = this.signupPassword;
      if (control?.hasError('required')) {
        return 'Le mot de passe est obligatoire';
      }
      if (control?.hasError('minlength')) {
        return 'Le mot de passe doit contenir au moins 6 caractères';
      }
      return '';
    }

  ngOnInit() {
    console.log('[LOGIN COMPONENT] Component initialized');
    
    if (this.authService.isLoggedIn()) {
      console.log('[LOGIN COMPONENT] User already logged in, redirecting to home');
      this.router.navigate(['/home']);
    }
  }

  onLogin(): void {
    console.log('[LOGIN COMPONENT] Login form submitted');
    
    if (this.loginForm.invalid) {
      console.warn('[LOGIN COMPONENT] Login form is invalid');
      this.loginForm.markAllAsTouched();
      return;
    }
    
    if (this.isLoginLoading) {
      console.warn('[LOGIN COMPONENT] Login already in progress');
      return;
    }
    
    this.isLoginLoading = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    
    console.log('[LOGIN COMPONENT] Attempting login for:', email);
    
    this.authService.login(email, password).subscribe({
      next: (user) => {
        console.log('[LOGIN COMPONENT] Login successful, user:', user.userName);
        this.isLoginLoading = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('[LOGIN COMPONENT] Login failed:', error);
        this.isLoginLoading = false;
        // Error is already handled by AuthService with toast notification
      }
    });
  }
  

  onSignup(): void {
    console.log('[LOGIN COMPONENT] Signup form submitted');
    
    if (this.signupForm.invalid) {
      console.warn('[LOGIN COMPONENT] Signup form is invalid');
      this.signupForm.markAllAsTouched();
      return;
    }
    
    if (this.isSignupLoading) {
      console.warn('[LOGIN COMPONENT] Signup already in progress');
      return;
    }
    
    this.isSignupLoading = true;
    const name = this.signupForm.value.name;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    
    console.log('[LOGIN COMPONENT] Attempting signup for:', email);
    
    this.authService.signup(name, email, password).subscribe({
      next: (user) => {
        console.log('[LOGIN COMPONENT] Signup successful, user:', user.userName);
        this.isSignupLoading = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('[LOGIN COMPONENT] Signup failed:', error);
        this.isSignupLoading = false;
        // Error is already handled by AuthService with toast notification
      }
    });
  }

  
  showSignUpPanel() {
    const container = document.getElementById('container');
    container?.classList.add('right-panel-active');
  }

  showSignInPanel() {
    const container = document.getElementById('container');
    container?.classList.remove('right-panel-active');
  }
}
