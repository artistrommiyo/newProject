import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-policy',
  templateUrl: './terms-policy.component.html',
  styleUrls: ['./terms-policy.component.css']
})
export class TermsPolicyComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']); // Navigate to Home Page
  } 
}
