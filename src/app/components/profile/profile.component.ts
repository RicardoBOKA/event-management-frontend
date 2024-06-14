import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user.model';
// import { Event } from '../../models/event.model';
import { Registration } from '../../models/registration.model';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  registrations: Registration[] = [];
  pastRegistrations: Registration[] = [];
  feedbackMessages: { [key: string]: string } = {};

  constructor(
    private authService: AuthService,
    private registrationService: RegistrationService,
    private feedbackService: FeedbackService,
    private router: Router
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
          const now = new Date();
          // this.registrations = data;
          this.registrations = data.filter(reg => new Date(reg.event.endEvent) > now);
          this.pastRegistrations = data.filter(reg => new Date(reg.event.endEvent) <= now);
          console.log('Fetched Registrations:', this.registrations);  // Debugging line
        },
        (error) => {
          console.log();
          console.error('Error fetching registrations', error);
        }
      );
    }
  }

  deleteRegistration(registrationId: string): void {
    console.log("ID REGISTRZTION ", registrationId);
    this.registrationService.cancelRegistration(registrationId).subscribe(
      () => {
        console.log(`Registration ${registrationId} deleted successfully.`);
        // this.registrations = this.registrations.filter(reg => reg.registrationId !== registrationId);
        this.registrations = this.registrations.filter(reg => reg.registrationId !== registrationId);
        this.pastRegistrations = this.pastRegistrations.filter(reg => reg.registrationId !== registrationId);

      },
      (error) => {
        console.error('Error deleting registration', error);
      }
    );
  }

  isUserOrganizer(eventUserId: string): boolean {
    return (this.currentUser && eventUserId === this.currentUser.userId)? true : false;
  }
  
  redirectToFeedback(eventId: string): void {
    this.router.navigate(['/add-feedback', eventId]);
  }

  onFeedbackSubmit(feedbackData: { eventId: string, comment: string, rating: number }): void {
    if (this.currentUser) {
      const feedbackRequest = {
        feedbackUserId: this.currentUser.userId,
        feedbackEventId: feedbackData.eventId,
        comment: feedbackData.comment,
        rating: feedbackData.rating
      };
  
      this.feedbackService.addFeedback(feedbackRequest).subscribe(
        () => {
          console.log(`Feedback for event ${feedbackData.eventId} submitted successfully.`);
          this.feedbackMessages[feedbackData.eventId] = 'Feedback submitted successfully!';
        },
        (error) => {
          console.error('Error submitting feedback', error);
          this.feedbackMessages[feedbackData.eventId] = 'Error submitting feedback.';
        }
      );
    } else {
      console.error('Current user is null, unable to submit feedback.');
      this.feedbackMessages[feedbackData.eventId] = 'You must be logged in to submit feedback.';
    }
  }

}
