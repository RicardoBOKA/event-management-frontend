import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event!: Event;  // Use the non-null assertion operator

  constructor() { }

  ngOnInit(): void {
  }

  onEventClick(): void {
    // Logic for handling event click, e.g., navigation to event details page
    console.log(`Event clicked: ${this.event.eventName}`);
  }
}
