import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { AuthGuard } from './components/guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddFeedbackComponent } from './components/add-feedback/add-feedback.component';
import { AuthGuard } from './services/auth.guard';
import { EventFeedbackComponent } from './components/event-feedback/event-feedback.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: 'events/add-event', component: AddEventComponent },
  { path: 'add-feedback/:eventId', component: AddFeedbackComponent },
  { path: 'event-feedback/:eventId', component: EventFeedbackComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
