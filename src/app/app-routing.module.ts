import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { AuthGuard } from './components/guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddFeedbackComponent } from './components/add-feedback/add-feedback.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  {path: 'events/add-event', component: AddEventComponent },
  { path: 'add-feedback/:eventId', component: AddFeedbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
