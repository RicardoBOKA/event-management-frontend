import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  success(message: string, title: string = 'Succès'): void {
    console.log('[NOTIFICATION] Success:', message);
    this.toastr.success(message, title, {
      timeOut: 3000,
      progressBar: true,
      closeButton: true
    });
  }

  error(message: string, title: string = 'Erreur'): void {
    console.log('[NOTIFICATION] Error:', message);
    this.toastr.error(message, title, {
      timeOut: 5000,
      progressBar: true,
      closeButton: true
    });
  }

  warning(message: string, title: string = 'Attention'): void {
    console.log('[NOTIFICATION] Warning:', message);
    this.toastr.warning(message, title, {
      timeOut: 4000,
      progressBar: true,
      closeButton: true
    });
  }

  info(message: string, title: string = 'Information'): void {
    console.log('[NOTIFICATION] Info:', message);
    this.toastr.info(message, title, {
      timeOut: 3000,
      progressBar: true,
      closeButton: true
    });
  }
}

