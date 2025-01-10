import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';  // Adjust path if needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  submitted = false;
  loginError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the login form with validation
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]], // Username with required validation
      password: ['', [Validators.required]]  // Password with required validation
    });

    // Redirect user to dashboard if they are already authenticated
    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  // Getter for form controls
  get f() {
    return this.loginForm.controls;
  }

  // Handle form submission
  onSubmit() {
    this.submitted = true;

    
    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Simulate login check (replace with actual logic)
    if (this.f['username'].value === 'admin' && this.f['password'].value === 'admin') {
      // Call login service
      console.log("working")
      this.authService.login();  // You should have a real login service here
      this.router.navigate(['/home']); // Redirect after successful login
    } else {
      // Show error if username or password is incorrect
      this.loginError = 'Invalid username or password';
    }
  }
}
