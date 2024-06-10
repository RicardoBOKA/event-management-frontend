// src/app/services/registration.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from '../models/registration.model';
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = `${env.apiUrl}/registrations`;

  constructor(private http: HttpClient) {}

  createRegistration(registration: Registration): Observable<Registration> {
    return this.http.post<Registration>(this.apiUrl, registration);
  }

  cancelRegistration(registrationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${registrationId}`);
  }

  getRegistrationById(registrationId: string): Observable<Registration> {
    return this.http.get<Registration>(`${this.apiUrl}/${registrationId}`);
  }

  getRegistrationsByEventId(eventId: string): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.apiUrl}/event/${eventId}`);
  }

  getRegistrationsByUserId(userId: string): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.apiUrl}/user/${userId}`);
  }

  isUserRegistered(userId: string, eventId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check?userId=${userId}&eventId=${eventId}`);
  }
}
