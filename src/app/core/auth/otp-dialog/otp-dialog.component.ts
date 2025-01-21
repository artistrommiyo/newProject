import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.css'],
})
export class OtpDialogComponent implements OnInit {
  otpForm!: FormGroup;
  otpSent = false; // Track whether the OTP has been sent
  invalidOtp = false; // Track whether the entered OTP is invalid

  constructor(
    public dialogRef: MatDialogRef<OtpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    private fb: FormBuilder,private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{4,6}$/)]], // OTP must be 4-6 digits
    });
  }

  // Getter for OTP control
  get otp() {
    return this.otpForm.get('otp');
  }

// Send OTP logic
sendOtp(): void {
  this.otpSent = true;
  // Ensure email is passed properly
  const email: string = this.data.email;  // data.email from MAT_DIALOG_DATA
  console.log("Sending OTP to email:", email);
  // Call the API to send OTP
  this.authService.sendOtp(email).subscribe(
    (response) => {
      console.log('OTP sent successfully to:', email);
      //this.otpSent = true; // Update OTP sent status
    },
    (error) => {
      console.error("Error sending OTP:", error);
    }
  );
}

  // Verify OTP logic
  verifyOtp(): void {
    if (this.otpForm.valid) {
      const email: string = this.data.email;
      const otp = this.otpForm.value.otp;
      this.authService.verifyOtp(email,otp).subscribe(
        (response) => {
          console.log('OTP sent successfully to:', response.data);
          //this.otpSent = true; // Update OTP sent status
          if (response.status === 200 && response.message === 'User verify successfully'){
            console.log('OTP Verified:', otp);
            // Add API call for verifying OTP here
            this.dialogRef.close({ success: true, otp: otp }); // Close popup and return success
          } else {
            this.invalidOtp = true; // Set invalid OTP flag
            console.error('Invalid OTP');
          }
        },
        (error) => {
          console.error("Error sending OTP:", error);
        }
      )
    } else {
      console.error('Form is invalid');
    }
  }

  // Close popup
  closePopup(): void {
    this.dialogRef.close({ success: false }); // Close dialog and return failure
  }
}
