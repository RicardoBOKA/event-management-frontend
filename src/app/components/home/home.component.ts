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
  evs: Event[] = [
    {
      "eventId": "91faf052-f95c-47e7-a9dd-e8ea02f8baf3",
      "eventName": "Event Test",
      "createdDate": "2024-06-09 11:46:06",
      "startEvent": "2024-06-09 11:46:06",
      "endEvent": "2024-06-09 11:46:06",
      "location": "31 Rue Location, Paris, 75002, France",
      "description": "Test Description",
      "user": {
        "userId": "74b068b6-ac6a-4f9a-83a9-a2b34f122a88",
        "userName": "TOTO",
        "password": "$2a$10$8C2pzdQ.3yZtZc.42v5.jeJRSixWHDH0rnvzeMaiJsTJX3ZZDvMzO",
        "email": "string@mail.com"
      }
    },
    {
      "eventId": "32071b0d-b7f9-47b8-b3b8-ff93c88e311a",
      "eventName": "Event 2",
      "createdDate": "2024-06-11 14:04:49",
      "startEvent": "2024-06-11 14:04:49",
      "endEvent": "2024-06-11 14:04:49",
      "location": "4 rue adresse, Paris, 75001, France",
      "description": "Description 2",
      "user": {
        "userId": "74b068b6-ac6a-4f9a-83a9-a2b34f122a88",
        "userName": "TOTO",
        "password": "$2a$10$8C2pzdQ.3yZtZc.42v5.jeJRSixWHDH0rnvzeMaiJsTJX3ZZDvMzO",
        "email": "string@mail.com"
      }
    },
    {
      "eventId": "d0edab02-266e-42c3-b774-870277ba8555",
      "eventName": "Event 2",
      "createdDate": "2024-06-11 14:04:49",
      "startEvent": "2024-06-11 14:04:49",
      "endEvent": "2024-06-11 14:04:49",
      "location": "4 rue adresse, Paris, 75001, France",
      "description": "Description 2",
      "user": {
        "userId": "74b068b6-ac6a-4f9a-83a9-a2b34f122a88",
        "userName": "TOTO",
        "password": "$2a$10$8C2pzdQ.3yZtZc.42v5.jeJRSixWHDH0rnvzeMaiJsTJX3ZZDvMzO",
        "email": "string@mail.com"
      }
    },
    {
      "eventId": "fad449a7-6fa1-4820-9b97-b777018929c7",
      "eventName": "Event 2",
      "createdDate": "2024-06-11 14:04:49",
      "startEvent": "2024-06-11 14:04:49",
      "endEvent": "2024-06-11 14:04:49",
      "location": "4 rue adresse, Paris, 75001, France",
      "description": "Description 2",
      "user": {
        "userId": "74b068b6-ac6a-4f9a-83a9-a2b34f122a88",
        "userName": "TOTO",
        "password": "$2a$10$8C2pzdQ.3yZtZc.42v5.jeJRSixWHDH0rnvzeMaiJsTJX3ZZDvMzO",
        "email": "string@mail.com"
      }
    },
    {
      "eventId": "34013fa0-a787-40ef-8636-32a900b9a3ec",
      "eventName": "Event 2",
      "createdDate": "2024-06-11 14:04:49",
      "startEvent": "2024-06-11 14:04:49",
      "endEvent": "2024-06-11 14:04:49",
      "location": "4 rue adresse, Paris, 75001, France",
      "description": "Description 2",
      "user": {
        "userId": "74b068b6-ac6a-4f9a-83a9-a2b34f122a88",
        "userName": "TOTO",
        "password": "$2a$10$8C2pzdQ.3yZtZc.42v5.jeJRSixWHDH0rnvzeMaiJsTJX3ZZDvMzO",
        "email": "string@mail.com"
      }
    },
    {
      "eventId": "92b90458-ccf3-4827-bf67-a614d0e57d84",
      "eventName": "Event 2",
      "createdDate": "2024-06-11 14:04:49",
      "startEvent": "2024-06-11 14:04:49",
      "endEvent": "2024-06-11 14:04:49",
      "location": "4 rue adresse, Paris, 75001, France",
      "description": "Description 2",
      "user": {
        "userId": "74b068b6-ac6a-4f9a-83a9-a2b34f122a88",
        "userName": "TOTO",
        "password": "$2a$10$8C2pzdQ.3yZtZc.42v5.jeJRSixWHDH0rnvzeMaiJsTJX3ZZDvMzO",
        "email": "string@mail.com"
      }
    }
  ];
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
}
