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
  registrationMessage: string | null = null;
  isRegistered: boolean = false;

  constructor(
    private authService: AuthService,
    private registrationService: RegistrationService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onEventClick(): void {
    // Logic for handling event click, e.g., navigation to event details page
    console.log(`Event clicked: ${this.event.eventName}`);
  }

 registerForEvent(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      if (this.isRegistered) {
        this.registrationMessage = 'You are already registered for this event';
        return;
      }
      const registrationRequest = {
        registrationUserId: currentUser.userId,
        registrationEventId: this.event.eventId
      };
      this.registrationService.createRegistration(registrationRequest).subscribe(
        (response) => {
          this.registrationMessage = 'Registration successful!';
          this.isRegistered = true;
        },
        (error) => {
          console.error('Error registering for event', error);
          this.registrationMessage = 'Error registering for event';
        }
      );
    } else {
      this.registrationMessage = 'You must be logged in to register for an event';
    }
  }

  checkRegistration(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.registrationService.isUserRegistered(currentUser.userId, this.event.eventId).subscribe(
        (isRegistered) => {
          this.isRegistered = isRegistered;
          if (this.isRegistered) {
            this.registrationMessage = 'You are already registered for this event';
          }
        },
        (error) => {
          console.error('Error checking registration', error);
        }
      );
    }
  }

}
