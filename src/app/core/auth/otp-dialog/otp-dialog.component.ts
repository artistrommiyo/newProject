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
  this.authService.sendOtp(this.data.email).subscribe(
    (response) => {
      if(response.status == 200){
        this.otpSent = true;
      }
    },
    (error) => {
      console.error("Error sending OTP:", error);
    }
  );
}

  // Verify OTP logic
  verifyOtp(): void {
    if (this.otpForm.valid) {
      this.authService.verifyOtp(this.data.email,this.otpForm.value.otp).subscribe(
        (response) => {
          if (response.status === 200 && response.message === 'User verify successfully'){
            this.dialogRef.close({ success: true}); // Close popup and return success
          } else {
            this.invalidOtp = true; // Set invalid OTP flag
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
