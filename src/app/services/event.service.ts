import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = `${env.apiUrl}/events`;

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  updateEvent(eventId: string, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${eventId}`, event);
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  }

  searchEvents(filters: any): Observable<Event[]> {
    let params = new HttpParams();
    if (filters.startDate) params = params.append('startDate', filters.startDate);
    if (filters.endDate) params = params.append('endDate', filters.endDate);
    if (filters.name) params = params.append('name', filters.name);
    if (filters.location) params = params.append('location', filters.location);

    return this.http.get<Event[]>(`${this.apiUrl}/search`, { params });
  }

  // Ajout d'une méthode pour récupérer les événements par un terme de recherche
  getEventsByAllLikeNamerLocation(location: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/searchName`, { params: { name: location } });
  }

  // searchEvents(startDate?: string, endDate?: string, name?: string, location?: string): Observable<Event[]> {
  //   let params = new HttpParams();
  //   if (startDate) params = params.set('startDate', startDate);
  //   if (endDate) params = params.set('endDate', endDate);
  //   if (name) params = params.set('name', name);
  //   if (location) params = params.set('location', location);
    
  //   return this.http.get<Event[]>(`${this.apiUrl}/search`, { params });
  // }
}
