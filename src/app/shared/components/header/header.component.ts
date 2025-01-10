import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
// import { AuthService } from '../../services/auth.service';  // Adjust path if needed

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;  // Boolean to track if the menu is open

  constructor(private authService: AuthService, private router: Router) {}

  // Method to toggle the side panel visibility (both open and close)
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Method to handle logout
  logout() {
    this.authService.logout();  // Call logout method from AuthService
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }
}
