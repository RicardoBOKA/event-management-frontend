import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-item',
  templateUrl: './feedback-item.component.html',
  styleUrls: ['./feedback-item.component.css']
})
export class FeedbackItemComponent implements OnInit {
  @Input() feedback!: Feedback;

  constructor() { }

  ngOnInit(): void {
  }
}
