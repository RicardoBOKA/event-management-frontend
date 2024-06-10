import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
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
    private userService: UserService,
    private router: Router
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

  ngOnInit() {
    // this.initForms();
  }

  // initForms() {
  //   this.loginForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required]
  //   });

  //   this.signupForm = this.fb.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required]
  //   });
  // }

  onLogin() {
    if (this.loginForm.valid) {
      this.userService.authenticateUser(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          success => {
            console.log("Logged in successfully!");
            this.router.navigate(['/']);  // Redirect to home or dashboard after login
          },
          error => {
            // this.errorMessage = "Invalid email or password";
            console.error('Login error', error);
          }
        );
    }
  }
  

  onSignup() {
    if (this.signupForm.valid) {
      const signupData = {
        userName: this.signupForm.value.name, // Assure-toi que les noms correspondent à ton modèle de données et à ton formulaire
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };
      this.userService.createUser(signupData).subscribe(
        user => {
          console.log("User created successfully!", user);
          this.router.navigate(['/']);
        },
        error => {
          // this.errorMessage = "Error signing up";
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
