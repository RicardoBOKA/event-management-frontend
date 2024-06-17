import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from '../../models/feedback.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-feedback-item',
  templateUrl: './feedback-item.component.html',
  styleUrls: ['./feedback-item.component.css']
})
export class FeedbackItemComponent implements OnInit {
  @Input() feedback!: Feedback;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  checkMe(userName: String): String {
    return (this.authService.getCurrentUser()?.userName == userName ? 'You' : userName);
  }
}
