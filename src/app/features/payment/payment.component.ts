// payment.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  selectedPlan: any = null; // Store the selected plan

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen for navigation events
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     // Get the state after the navigation ends
    //     const navigationState:any = this.router.getCurrentNavigation()?.extras?.state;
        
    //     if (navigationState?.plan) {
    //       // If the plan is passed in state, assign it to selectedPlan
    //       this.selectedPlan = navigationState.plan;
    //     } else {
    //       this.router.navigate(['/plans']);
    //       console.log("Plan not found in navigation state");
    //     }
    //   }
    // });
  }

  proceedToPayment() {
    // Logic for proceeding with payment
    console.log('Proceeding with plan:', this.selectedPlan);
  }
}
