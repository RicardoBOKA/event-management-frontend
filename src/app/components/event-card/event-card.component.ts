import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { AuthService } from '../../services/auth.service';
import { RegistrationService } from '../../services/registration.service';
import { Router } from '@angular/router';
import { Registration } from '../../models/registration.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event!: Event;
  @Input() index!: number;
  registrations: Registration[] = []; // To store registrations for the event itSelf
  registrationMessage: string | null = null;
  isRegistered: boolean = false;
  isPastEvent: boolean = false;
  imageSeed!: string;

  constructor(
    private authService: AuthService,
    private registrationService: RegistrationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.checkEventStatus();
    this.checkRegistration();
    this.loadRegistrations();
    this.imageSeed = `${this.event.eventId}-${new Date().getTime()}`;
  }

  checkEventStatus(): void {
    const now = new Date();
    this.isPastEvent = new Date(this.event.endEvent) < now;
    if (this.isPastEvent) {
      this.registrationMessage = "This event has already occurred.";
    }
  }

    // Function to determine the color based on index
    getColorClass(): string {
      const colorIndex = this.index % 4; // Modulus 4 because there are four colors
      switch (colorIndex) {
        case 0:
          return 'green';
        case 1:
          return 'red';
        case 2:
          return 'blue';
        case 3:
          return 'yellow';
        default:
          return 'green'; // Default to green if something unexpected happens
      }
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

  // registerForEvent(): void {
  //   const currentUser = this.authService.getCurrentUser();
  //   if (!currentUser) {
  //     this.registrationMessage = 'You must be logged in to register for an event';
  //     return;
  //   }
  //   if (this.isRegistered) {
  //     this.registrationMessage = 'You are already registered for this event';
  //     return;
  //   }
  //   const registrationRequest = {
  //     registrationUserId: currentUser.userId,
  //     registrationEventId: this.event.eventId
  //   };
  //   this.registrationService.createRegistration(registrationRequest).subscribe(
  //     () => {
  //       this.registrationMessage = 'Registration successful!';
  //       this.isRegistered = true;
  //       this.loadRegistrations();  // Reload registrations to update the list
  //     },
  //     (error) => {
  //       console.error('Error registering for event', error);
  //       this.registrationMessage = 'Error registering for event';
  //     }
  //   );
  // }
  registerForEvent(): void {
    if (!this.authService.isLoggedIn()) {
      this.registrationMessage = 'You must be logged in to register for an event';
      return;
    }
    if (this.isRegistered) {
      this.registrationMessage = 'You are already registered for this event';
      return;
    }
    const currentUser = this.authService.getCurrentUser();
    this.registrationService.createRegistration({
      registrationUserId: currentUser!.userId,
      registrationEventId: this.event.eventId
    }).subscribe({
      next: () => {
        this.registrationMessage = 'Registration successful!';
        this.isRegistered = true;
        this.loadRegistrations();
      },
      error: (error) => {
        console.error('Error registering for event', error);
        this.registrationMessage = 'Error registering for event';
      }
    });
  }
  checkRegistration(): void {
    if (!this.authService.isLoggedIn()) return;
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      console.log("!currentUser in event-card - checkRegistration");
      return;
    }
    this.registrationService.isUserRegistered(currentUser.userId, this.event.eventId).subscribe(
      (isRegistered) => {
        this.isRegistered = isRegistered;
        if (isRegistered && !this.isPastEvent) {
          this.registrationMessage = 'You are already registered for this event';
        }
      },
      (error) => {
        console.error('Error checking registration', error);
      }
    );
  }


}
