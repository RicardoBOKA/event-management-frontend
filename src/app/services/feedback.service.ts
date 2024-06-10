import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = `${env.apiUrl}/feedbacks`;

  constructor(private http: HttpClient) {}

  getFeedbackById(feedbackId: string): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/${feedbackId}`);
  }

  getFeedbacksByEventId(eventId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/event/${eventId}`);
  }

  getFeedbacksByUserId(userId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/user/${userId}`);
  }

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback);
  }

  updateFeedback(feedbackId: string, feedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.apiUrl}/${feedbackId}`, feedback);
  }

  deleteFeedback(feedbackId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${feedbackId}`);
  }
}
