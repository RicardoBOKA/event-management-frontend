import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model'; // Assurez-vous que le chemin d'accès est correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isOpen: boolean = false;
  isLoggedIn: boolean = true; // Initialiser comme false
  currentUser: User | null = null; // Pour stocker les informations de l'utilisateur connecté

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Vérifier si un utilisateur est connecté et obtenir les détails
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const user = this.authService.getCurrentUser();
    this.isLoggedIn = !!user; // Convertir la présence de l'utilisateur en valeur booléenne
    this.currentUser = user; // Stocker l'utilisateur pour un usage dans la template si nécessaire
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.authService.logout(); // Appeler la méthode logout de AuthService
  }

  navigateTo(fragment: string): void {
    this.router.navigate([], { fragment: fragment });
  }
}
