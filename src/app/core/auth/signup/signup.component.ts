import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OtpDialogComponent } from '../otp-dialog/otp-dialog.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Only 10-digit numbers
      password: ['', [Validators.required, Validators.minLength(6)]],
      referralCode: ['', [Validators.pattern(/^[a-zA-Z0-9]*$/)]], // Optional
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]], // 5-6 digit numbers
      state: ['', [Validators.required]]
    });    
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
  
    // Stop if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
  
    // Handle successful submission
    console.log('Signup successful:', this.signupForm.value);
    this.openOtpDialog();
  }

  openOtpDialog(): void {
    const dialogRef = this.dialog.open(OtpDialogComponent, {
      width: '400px',
      maxWidth: '400px', // Limit to prevent overflow
      disableClose: true, 
      data: { email: this.signupForm.get('email')?.value } // Pass the email value
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        console.log('OTP Verified Successfully:', result.otp);
        this.authService.login();
        this.router.navigate(['/home']);
      } else {  
        console.log('OTP Verification Canceled');
      }
    });
  }
  
}
