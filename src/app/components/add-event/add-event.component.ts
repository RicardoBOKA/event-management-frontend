import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private eventService: EventService,   private authService: AuthService ) {
    this.eventForm = this.fb.group({
        eventName: ['', Validators.required],
        startEvent: ['', Validators.required],
        endEvent: ['', Validators.required],
        location: this.fb.group({
          addressLine: ['', Validators.required],
          city: ['', Validators.required],
          postalCode: ['', Validators.required],
          country: ['', Validators.required]
        }),
        description: ['', Validators.required],
        organizerId: [{value: '', disabled: false}]
    });
  }

  ngOnInit() {
    this.eventForm.get('organizerId')?.setValue(this.authService.getCurrentUser()?.userId);
    this.eventForm.valueChanges.subscribe(values => {
      console.log("User info : ", this.eventForm.get('organizerId'));
      console.log("Event org ", this.eventForm);
    });
  }

  onSubmit() {
    console.log("Valide add event ? : ", this.eventForm.valid);
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value).subscribe({
        next: (event) => {
          console.log('Event created:', event);
          // Traitement post-création, comme la redirection ou l'affichage d'un message
        },
        error: (error) => {
          console.error('Error creating event:', error);
        }
      });
    }
  }
}
