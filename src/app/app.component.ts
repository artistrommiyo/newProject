import { Component, OnInit } from '@angular/core';
// import { AuthService } from './core/auth/auth.service';  // Ensure the AuthService is available
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;  // To track if user is logged in

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if user is authenticated on app initialization
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;

      // If user is logged in, redirect to home page
      if (this.isAuthenticated) {
        this.router.navigate(['/home']);
      } else {
        // If not logged in, stay on the login page
        this.router.navigate(['/login']);
      }
    });
  }
}
