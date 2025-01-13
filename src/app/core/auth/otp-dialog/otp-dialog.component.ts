import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder
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
    this.otpSent = true; // Toggle to OTP input screen
    console.log(`OTP sent to ${this.data.email}`); // Replace with API call for sending OTP
  }

  // Verify OTP logic
  verifyOtp(): void {
    if (this.otpForm.valid) {
      const otp = this.otpForm.value.otp;
      if (otp === '123456') {
        console.log('OTP Verified:', otp);
        // Add API call for verifying OTP here
        this.dialogRef.close({ success: true, otp: otp }); // Close popup and return success
      } else {
        this.invalidOtp = true; // Set invalid OTP flag
        console.error('Invalid OTP');
      }
    } else {
      console.error('Form is invalid');
    }
  }

  // Close popup
  closePopup(): void {
    this.dialogRef.close({ success: false }); // Close dialog and return failure
  }
}
