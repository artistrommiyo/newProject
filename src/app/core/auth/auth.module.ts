import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OtpDialogComponent } from './otp-dialog/otp-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    LoginComponent, // Declare only relevant components
    SignupComponent, OtpDialogComponent // Declare only relevant components
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Import forms module for reactive forms
    RouterModule, // Import routing module if you're using router links
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    LoginComponent, // Export LoginComponent if it's used outside of this module
    SignupComponent // Export SignupComponent if it's used outside of this module
  ]
})
export class AuthModule { }
