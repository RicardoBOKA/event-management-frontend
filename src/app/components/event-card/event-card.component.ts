import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { AuthService } from '../../services/auth.service';
import { RegistrationService } from '../../services/registration.service';
import { Router } from '@angular/router';
import { Registration } from '../../models/registration.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event!: Event;
  registrations: Registration[] = []; // To store registrations for the event itSelf
  registrationMessage: string | null = null;
  isRegistered: boolean = false;

  constructor(
    private authService: AuthService,
    private registrationService: RegistrationService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.checkRegistration();
    this.loadRegistrations();
  }

  loadRegistrations(): void {
    this.registrationService.getRegistrationsByEventId(this.event.eventId)
      .subscribe({
        next: (registrations) => {
          this.registrations = registrations;
        },
        error: (error) => {
          console.error('Failed to load registrations', error);
        }
      });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  onEventClick(): void {
    console.log(`Event clicked: ${this.event.eventName}`);
    console.log('registrations = ', this.registrations);
    // this.router.navigate(['/event-details', this.event.eventId]);
  }

  registerForEvent(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.registrationMessage = 'You must be logged in to register for an event';
      return;
    }
    if (this.isRegistered) {
      this.registrationMessage = 'You are already registered for this event';
      return;
    }
    const registrationRequest = {
      registrationUserId: currentUser.userId,
      registrationEventId: this.event.eventId
    };
    this.registrationService.createRegistration(registrationRequest).subscribe(
      () => {
        this.registrationMessage = 'Registration successful!';
        this.isRegistered = true;
        this.loadRegistrations();  // Reload registrations to update the list
      },
      (error) => {
        console.error('Error registering for event', error);
        this.registrationMessage = 'Error registering for event';
      }
    );
  }


  checkRegistration(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return;
    }
    this.registrationService.isUserRegistered(currentUser.userId, this.event.eventId).subscribe(
      (isRegistered) => {
        this.isRegistered = isRegistered;
        if (isRegistered) {
          this.registrationMessage = 'You are already registered for this event';
        }
      },
      (error) => {
        console.error('Error checking registration', error);
      }
    );
  }


}
