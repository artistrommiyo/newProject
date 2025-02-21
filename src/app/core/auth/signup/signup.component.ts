import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OtpDialogComponent } from '../otp-dialog/otp-dialog.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  userDetails: any;
  isAlreadyLogin: boolean = false;
  isEditing: boolean = false; // To toggle edit mode

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch user details
    this.userDetails = this.authService.getUserDetails();
    this.isAlreadyLogin = this.userDetails ? true : false;

    // Initialize form with user details if logged in, else empty
    this.signupForm = this.formBuilder.group({
      firstName: [
        this.userDetails?.firstName || '',
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [
        this.userDetails?.lastName || '',
        [Validators.required, Validators.minLength(2)],
      ],
      email: [
        this.userDetails?.email || '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'
          ),
        ],
      ],
      mobile: [
        this.userDetails?.mobile || '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      password: [
        this.isAlreadyLogin ? this.userDetails?.password : '', // Password should be empty for logged-in users
        this.isAlreadyLogin ? [] : [Validators.required, Validators.minLength(6)],
      ],
      referralCode: [
        this.userDetails?.referralCode || '',
        [Validators.pattern(/^[a-zA-Z0-9]*$/)],
      ],
      address: [this.userDetails?.address || '', [Validators.required]],
      city: [this.userDetails?.city || '', [Validators.required]],
      pincode: [
        this.userDetails?.pincode || '',
        [Validators.required, Validators.pattern(/^\d{5,6}$/)],
      ],
      state: [this.userDetails?.state || '', [Validators.required]],
    });

    if (this.isAlreadyLogin) {
      this.signupForm.disable(); // Disable the form if the user is logged in
    }
  }

  // Getter for form controls
  get f() {
    return this.signupForm.controls;
  }

  // Create account submission
  onSubmit(): void {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }

    if (this.isAlreadyLogin) {
      // Update user profile
      const userInfo = this.signupForm.value;
      delete userInfo.password;
      userInfo.id = this.userDetails.id;
      userInfo.email = this.userDetails.email;
      this.authService.updateUser(this.signupForm.value).subscribe(
        (res) => {
          if (res.status == 200 && res.payLoad) {
            this.userDetails = res.payLoad;
            this.authService.updateUserDetails(this.userDetails);
            this.isEditing = false;
            this.signupForm.disable();
          }
        },
        (err) => {
          console.error('Error updating profile:', err);
        }
      );
    } else {
      // Create new account
      this.authService.createUser(this.signupForm.value).subscribe(
        (res) => {
          if (res.status == 200 && res.payLoad) {
            this.userDetails = res.payLoad;
            this.openOtpDialog();
          }
        },
        (err) => {
          console.error('Error during signup:', err);
        }
      );
    }
  }

  // Open OTP Dialog
  openOtpDialog(): void {
    const email: string = this.signupForm.get('email')?.value;
    const dialogRef = this.dialog.open(OtpDialogComponent, {
      width: '400px',
      maxWidth: '400px',
      disableClose: true,
      data: { email: email },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.authService.login(this.userDetails);
        this.router.navigate(['/home']);
      } else {
        console.log('OTP Verification Canceled');
      }
    });
  }

  // Enable edit mode
  enableEdit(): void {
    this.isEditing = true;
    this.signupForm.enable();
    this.signupForm.get('email')?.disable();
    this.signupForm.get('referralCode')?.disable();
    this.signupForm.get('referralCode')?.disable(); 
    this.signupForm.get('password')?.disable(); // Keep email non-editable
  }

  // Cancel editing
  cancelEdit(): void {
    this.isEditing = false;
    this.signupForm.patchValue(this.userDetails); // Reset to original values
    this.signupForm.disable();
  }

  forgetPassword(){
    const email: string = this.signupForm.get('email')?.value;
    const dialogRef = this.dialog.open(OtpDialogComponent, {
      width: '400px',
      maxWidth: '400px',
      disableClose: true,
      data: { email: email ,forgetPass: true},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        // this.authService.login(this.userDetails);
        this.router.navigate(['/profile']);
      } else {
        console.log('OTP Verification Canceled');
      }
    });
  }
}

