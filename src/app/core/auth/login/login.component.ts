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

onSubmit(){
 console.log(this.loginForm.get("username")?.value); 
 var username=this.loginForm.get("username")?.value;
 var password=this.loginForm.get("password")?.value;
 
 this.authService.login(username,password).subscribe((res)=>{
  console.log("res.data :-"+res.data);

 });


}

  // // Handle form submission
  // onSubmit() {
  //   this.submitted = true;

    
  //   // Stop if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   // Simulate login check (replace with actual logic)
  //   if (this.f['username'].value === 'admin' && this.f['password'].value === 'admin') {
  //     // Call login service
  //     console.log("working")
  //     this.authService.login();  // You should have a real login service here
  //     const navigation = this.router.getCurrentNavigation();
  //     const redirectUrl = navigation?.previousNavigation?.extras.state?.['redirectUrl'] || '/home';
  //     const plan = navigation?.previousNavigation?.extras.state?.['plan'];
  
  //     if (redirectUrl && plan) {
  //       // Navigate to the payment page with the plan details
  //       this.router.navigate([redirectUrl], { state: { plan } });
  //     } else {
  //       // Default navigation
  //       this.router.navigate([redirectUrl]);
  //     } // Redirect after successful login
  //   } else {
  //     // Show error if username or password is incorrect
  //     this.loginError = 'Invalid username or password';
  //   }
  // }
}
