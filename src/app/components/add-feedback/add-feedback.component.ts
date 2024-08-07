import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Feedback } from '../../models/feedback.model';
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
  stars: boolean[] = Array(5).fill(false);


  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private route: ActivatedRoute
    
  ) {
    this.feedbackForm = this.fb.group({
      comment: ['', Validators.required],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });

    this.eventId = '';
  }


  public rate(rating: number) {
    console.log('rating', rating);

    const currentRating = this.feedbackForm.get('rating')?.value;
    this.stars = this.stars.map((_, i) => rating > i);

    if (currentRating === rating) {
      // Désélectionner toutes les étoiles si la même étoile est cliquée de nouveau
      this.feedbackForm.get('rating')?.setValue(null);
      this.stars.fill(false);
    } else {
      // Mettre à jour la valeur du formulaire
      this.feedbackForm.get('rating')?.setValue(rating);
    }
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.eventId = this.route.snapshot.paramMap.get('eventId') || '';
    this.feedbackForm.valueChanges.subscribe(values => {
      console.log("SingUp form Values:", values);
    });
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
