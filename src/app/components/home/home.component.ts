import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: Event[] = [];
  pastEvents: Event[] = [];
  filteredEvents: Event[] = [];

  filterName: string = '';
  filterStartDate: string = '';
  filterEndDate: string = '';
  filterLocation: string = '';

  constructor(private eventService: EventService, private authService: AuthService, private router:Router  ) {}

  ngOnInit(): void {
    this.fetchEvents();
  }


  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe(data => this.processEvents(data));
    console.log("EVENTS : ", this.events);
  }

  applyFilters(): void {
    const filters = {
      startDate: this.filterStartDate,
      endDate: this.filterEndDate,
      name: this.filterName,
      location: this.filterLocation
    };
    console.log("FILTERS : ", filters);
    console.log('1');
    this.eventService.searchEvents(filters).subscribe(data => this.processEvents(data));
    console.log('2');
    console.log("FILTERed: ", this.filteredEvents);
  }

  private processEvents(data: Event[]): void {
    const now = new Date();
    data.sort((a, b) => new Date(a.endEvent).getTime() - new Date(b.endEvent).getTime());
    this.events = data.filter(event => new Date(event.endEvent) >= now);
    this.pastEvents = data.filter(event => new Date(event.endEvent) < now);
  }

  // fetchEvents(): void {
  //   this.eventService.getAllEvents().subscribe(
  //     (data: Event[]) => {
  //       const now = new Date();
  //       // Trier par evenement qui se termine le plus tôt
  //       data.sort((a, b) => new Date(a.endEvent).getTime() - new Date(b.endEvent).getTime());

  //       this.events = data;
  //       this.events = data.filter(event => new Date(event.endEvent) >= now);
  //       this.pastEvents = data.filter(event => new Date(event.endEvent) < now);

  //     },
  //     (error) => {
  //       console.error('Error fetching events', error);
  //     }
  //   );
  // }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();  // Verif si l'utilisateur est connecté
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']); 
  }
}
