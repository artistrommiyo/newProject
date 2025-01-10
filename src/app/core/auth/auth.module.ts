import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent, // Declare only relevant components
    SignupComponent // Declare only relevant components
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Import forms module for reactive forms
    RouterModule // Import routing module if you're using router links
  ],
  exports: [
    LoginComponent, // Export LoginComponent if it's used outside of this module
    SignupComponent // Export SignupComponent if it's used outside of this module
  ]
})
export class AuthModule { }
