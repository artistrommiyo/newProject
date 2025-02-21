import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false; // Tracks if the menu is open
  isAuthenticated = false; // Tracks user's authentication status
  isAdmin: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to authentication status
    this.authService.isAuthenticated$.subscribe(
      (status) => (this.isAuthenticated = status)
    );
    this.isAdmin = this.authService.getUserRole() === 'ADMIN' ? true : false;
  }

  // Toggle menu visibility
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Logout and navigate to login page
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toggleMenu(); // Close menu after logout
  }
}
