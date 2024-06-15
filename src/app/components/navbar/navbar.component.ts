import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appName: string = "Event Manager";
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Utilisation d'une méthode adaptée pour vérifier si l'utilisateur est connecté
    this.checkLoginStatus();
  }

  // Nouvelle méthode pour gérer l'abonnement au statut de connexion
  checkLoginStatus() {
    const user = this.authService.getCurrentUser();
    this.isLoggedIn = !!user; // Transforme l'utilisateur en booléen pour définir isLoggedIn
  }

  logOut() {
    this.authService.logout();  // Utiliser logout de AuthService
    this.router.navigate(['/']);  // Redirection vers la page de connexion
  }
}
