import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user.model';
// import { Event } from '../../models/event.model';
import { Registration } from '../../models/registration.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  registrations: Registration[] = [];

  constructor(
    private authService: AuthService,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current User in Profile:', this.currentUser);  // Debugging line
    if (this.currentUser) {
      this.fetchRegistrations();
    }
  }

  fetchRegistrations(): void {
    if (this.currentUser) {
      this.registrationService.getRegistrationsByUserId(this.currentUser.userId).subscribe(
        (data: Registration[]) => {
          this.registrations = data;
          console.log('Fetched Registrations:', this.registrations);  // Debugging line
        },
        (error) => {
          console.error('Error fetching registrations', error);
        }
      );
    }
  }}
