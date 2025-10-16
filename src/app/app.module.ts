import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';


import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { UserService } from './services/user.service';
import { FeedbackService } from './services/feedback.service';
import { RegistrationService } from './services/registration.service';

import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddFeedbackComponent } from './components/add-feedback/add-feedback.component';
import { EventFeedbackComponent } from './components/event-feedback/event-feedback.component';
import { FeedbackItemComponent } from './components/feedback-item/feedback-item.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    EventCardComponent,
    AddEventComponent,
    ProfileComponent,
    AddFeedbackComponent,
    EventFeedbackComponent,
    FeedbackItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      maxOpened: 3
    })
  ],
  providers: [
    AuthService,
    EventService,
    UserService,
    RegistrationService,
    FeedbackService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
