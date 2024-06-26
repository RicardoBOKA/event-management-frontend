import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../../services/user.service';
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
  // errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    // private userService: UserService,
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

    // Getters for loginForm controls
    get loginEmail() {
      return this.loginForm.get('email');
    }
    get loginPassword() {
      return this.loginForm.get('password');
    }
    // Getters for signupForm controls
    get signupName() {
      return this.signupForm.get('name');
    }
    get signupEmail() {
      return this.signupForm.get('email');
    }
    get signupPassword() {
      return this.signupForm.get('password');
    }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']); // Si déjà connecté, redirigez vers l'accueil
    }
    // this.signupForm.valueChanges.subscribe(values => {
    //   console.log("SingUp form Values:", values);
    // });
    // this.loginForm.valueChanges.subscribe(values => {
    //   console.log("Login form Values:", values)
    // })
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log();
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          user => {
            if (user) {
              console.log("Logged in successfully!");
              this.router.navigate(['/home']);  // Redirect to homepage after login
            } else {
              console.error("Login failed");
            }
          },
          error => {
            console.error('Login error', error);
          }
        );
    }
  }
  

  onSignup(): void {
    if (this.signupForm.valid) {
      this.authService.signup(
        this.signupForm.value.name,
        this.signupForm.value.email,
        this.signupForm.value.password
      ).subscribe(
        user => {
          console.log("User created successfully!", user);
          this.router.navigate(['/home']);  // Redirect to homepage after signup
        },
        error => {
          console.error('Signup error', error);
        }
      );
    }
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
