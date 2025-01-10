import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  signupError: string = '';  // Add this line

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{1,4}?[ -]?\(?\d{1,4}?\)?[ -]?\d{1,4}?[ -]?\d{1,4}?[ -]?\d{1,4}$/)]],
      referralCode: ['', [Validators.pattern(/^[a-zA-Z0-9]*$/)]]
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    // If form is invalid, return
    if (this.signupForm.invalid) {
      return;
    }

    // Handle the successful form submission
    console.log('Signup successful:', this.signupForm.value);

    // Example of handling an error (e.g., if signup fails):
    // this.signupError = 'An error occurred during signup. Please try again later.';
  }
}
