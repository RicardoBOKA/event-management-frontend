import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from './services/event.service';
import { UserService } from './services/user.service';
import { FeedbackService } from './services/feedback.service';
import { RegistrationService } from './services/registration.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    EventService,
    UserService,
    RegistrationService,
    FeedbackService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
