// event-feedback.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { EventService } from '../../services/event.service';
import { Feedback } from '../../models/feedback.model';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-feedback',
  templateUrl: './event-feedback.component.html',
  styleUrls: ['./event-feedback.component.css', './event-feedback.component.scss']
})
export class EventFeedbackComponent implements OnInit {
  event!: Event;
  feedbacks: Feedback[] = [];

  constructor(
    private route: ActivatedRoute, 
    private feedbackService: FeedbackService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.loadEvent(eventId);
    this.loadFeedbacks(eventId);
  }

  loadEvent(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe(
      (data) => {
        this.event = data;
      },
      (error) => {
        console.error('Error fetching event', error);
      }
    );
  }

  loadFeedbacks(eventId: string): void {
    this.feedbackService.getFeedbacksByEventId(eventId).subscribe(
      (data) => {
        this.feedbacks = data;
      },
      (error) => {
        console.error('Error fetching feedbacks', error);
      }
    );
  }
}
