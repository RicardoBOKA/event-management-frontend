import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { AuthService } from '../../services/auth.service';
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  currentUser: User | null = null;
  eventId: string;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private route: ActivatedRoute
    // private eventService: EventService
  ) {
    this.feedbackForm = this.fb.group({
      comment: ['', Validators.required],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });

    this.eventId = '';
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.eventId = this.route.snapshot.paramMap.get('eventId') || '';
  }

  onSubmit(): void {
    if (this.feedbackForm.valid && this.currentUser) {
      const feedbackRequest = {
        feedbackUserId: this.currentUser.userId,
        feedbackEventId: this.eventId,
        comment: this.feedbackForm.value.comment,
        rating: this.feedbackForm.value.rating
      };
      console.log("feedbackRequest = ", feedbackRequest);
      this.feedbackService.addFeedback(feedbackRequest).subscribe(
        () => {
          console.log(`Feedback for event ${this.eventId} submitted successfully.`);
          // Optionally, navigate back to profile or show a success message
        },
        (error) => {
          console.error('Error submitting feedback', error);
          // Optionally, show an error message
        }
      );
    }
  }
}
