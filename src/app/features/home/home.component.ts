import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
// import { AuthService } from 'src/app/core/auth/auth.service'; // Adjust path as necessary

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isAuthenticated = false; // Track user's authentication status
  backgroundImages: string[] = [
    'assets/coin.png',
    'assets/groups.png',
    'assets/shake hand.jpg',
    'assets/linked.jpg',
    'assets/spin wheel.jpg',
    'assets/stairs.png',
    'assets/Ludo.jpg',
    'assets/about.webp'
  ];
  
  backgroundImage: string = this.backgroundImages[0];
  private currentIndex = 0;


  constructor(
    private router: Router, 
    private authService: AuthService,
    private renderer: Renderer2) {}

  ngOnInit(): void {
    this.updateBackground();
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.backgroundImages.length;
      this.updateBackground();
    }, 3000); 
    // Subscribe to the authentication status observable
    this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => (this.isAuthenticated = isAuthenticated)
    );
  }

  explorePlans() {
    this.router.navigate(['/plans']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  updateBackground() {
    const homeContainer = document.querySelector('.home-container');
    if (homeContainer) {
      this.renderer.setStyle(
        homeContainer,
        'background-image',
        `url(${this.backgroundImages[this.currentIndex]})`
      );
    }
  }
}
