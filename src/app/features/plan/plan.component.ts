import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  plans = [
    { name: 'Silver Plan', description: 'Basic plan features', price: 999 },
    { name: 'Gold Plan', description: 'Advanced plan features', price: 1999 },
    { name: 'Platinum Plan', description: 'Premium plan features', price: 2999 }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  buyNow(plan: any): void {
    // this.router.navigate(['/login'], { state: { redirectUrl: '/payment', plan } });
    if (this.authService.isAuthenticated) {
      // User is logged in, navigate to payment page
      this.router.navigate(['/payment'], { state: { plan } });
    } else {
      // User is not logged in, redirect to login page and store the plan details
      this.router.navigate(['/login'], { state: { redirectUrl: '/payment', plan } });
    }
  }
}
