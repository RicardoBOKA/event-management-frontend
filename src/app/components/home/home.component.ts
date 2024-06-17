import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: Event[] = [];
  pastEvents: Event[] = [];

  constructor(private eventService: EventService, private authService: AuthService, private router:Router  ) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data: Event[]) => {
        const now = new Date();
        // Trier par evenement qui se termine le plus tôt
        data.sort((a, b) => new Date(b.endEvent).getTime() - new Date(a.endEvent).getTime());

        this.events = data;
        this.events = data.filter(event => new Date(event.endEvent) >= now);
        this.pastEvents = data.filter(event => new Date(event.endEvent) < now);

      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();  // Utilise cette méthode pour vérifier si l'utilisateur est connecté
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']); 
  }

  searchFilters = {
  startDate: '',
  endDate: ''
  };

  searchEvents(): void {
  this.eventService.searchEvents(this.searchFilters).subscribe(events => {
    this.events = events;
  });
  }
}
