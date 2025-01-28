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
        this.router.navigate(['/home']);
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

    this.authService.checkLogin(this.f['username'].value,this.f['password'].value).subscribe(
      (res)=>{
        if(res.status == 200 && res.payLoad){
          const userDetails = res.payLoad; // Extract payload
          this.authService.login(userDetails);  // Save to localStorage && You should have a real login service here
          this.loginUrlRedirect(); // Redirect after successful login
        }else{
          this.loginError = 'Invalid username or password';       // Show error if username or password is incorrect
        }
    },
    (eror)=>{
      this.loginError = 'Invalid username or password';       // Show error if username or password is incorrect
    });
  }

  loginUrlRedirect(){
    const navigation = this.router.getCurrentNavigation();
    const redirectUrl = navigation?.previousNavigation?.extras.state?.['redirectUrl'] || '/home';
    const plan = navigation?.previousNavigation?.extras.state?.['plan'];
    if (redirectUrl && plan) {
      this.router.navigate([redirectUrl], { state: { plan } }); // Navigate to the payment page with the plan details
    } else {
      this.router.navigate([redirectUrl]);      // Default navigation
    }
  }
}
