import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false); // Default value is false
  public isAuthenticated$: Observable<boolean> = this._isAuthenticated.asObservable();
                            
  private baseUrl: string = 'https://64.227.174.34:9101';

  private _userDetails = new BehaviorSubject<any>(null); // User details observable
  public userDetails$: Observable<any> = this._userDetails.asObservable();

  
  constructor(private http:HttpClient) {
    // Initialize user details from localStorage (if available)
    const storedUser = localStorage.getItem('userDetails');
    if (storedUser) {
      this._userDetails.next(JSON.parse(storedUser));
      this._isAuthenticated.next(true);
    }
  }

  //Set the user authentication state (login)
   login(updatedDetails: any): void {
     this._isAuthenticated.next(true); // Change to true when user logs in
     this.storeUserDetails(updatedDetails); 
   }
  
  checkLogin(email: string, password: string): Observable<any> {
    const url = this.baseUrl + '/api/auth/login'; // Complete login endpoint 
    const body = { email, password };
    return this.http.post(url, body);
  }

  createUser(user:any):Observable<any>{
    const url = this.baseUrl + '/moneymining/api/add/user';
    return this.http.post<any>(url,user);
  }


  sendOtp(email: string): Observable<any> {
    const otpType = 'o';
    const url = this.baseUrl +`/moneymining/api/send/otp?email=${email}&otpType=${otpType}`;
    return this.http.post<any>(url, {});
  }

  // Method to verify OTP
  verifyOtp(email:string, otp: string): Observable<any> {
    const url = this.baseUrl +`/moneymining/api/enabled/user?email=${email}&otp=${otp}`;
    return this.http.post<any>(url, {});
  }
  forgetPass(email:string, otp: string, newpass:any): Observable<any> {
    const url = this.baseUrl +`/moneymining/api/enabled/user?email=${email}&otp=${otp}&newPassword=${newpass}`;
    return this.http.post<any>(url, {});
  }

  // Check current authentication status
  get isAuthenticated(): boolean {
    return this._isAuthenticated.value;
  }


  // Method to handle logout
  logout(): void {
    this._isAuthenticated.next(false);
    this._userDetails.next(null);
    localStorage.removeItem('userDetails'); // Remove from localStorage
  }

  // Store user details in localStorage and update observable
  private storeUserDetails(userDetails: any): void {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    this._userDetails.next(userDetails);
  }

  // Get user details
  getUserDetails(): any {
    return this._userDetails.value;
  }

  // Update user details in localStorage and observable
  updateUserDetails(updatedDetails: any): void {
    this.storeUserDetails(updatedDetails);
  }

  updateUser(user:any):Observable<any>{
    const url = this.baseUrl + '/moneymining/api/update/user';
    return this.http.put<any>(url,user);
  }

  // Get user role
  getUserRole(): string | null {
    const userDetails = this.getUserDetails();
    return userDetails?.role?.roleName || null; // Return role or null
  }
}
