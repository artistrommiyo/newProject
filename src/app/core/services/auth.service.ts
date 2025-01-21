import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false); // Default value is false
  public isAuthenticated$: Observable<boolean> = this._isAuthenticated.asObservable();

   private baseUrl: string = 'http://localhost:9101';

  
  constructor(private http:HttpClient) {}

  //Set the user authentication state (login)
  /* login(): void {
     this._isAuthenticated.next(true); // Change to true when user logs in
   }*/
  
  login(email: string, password: string): Observable<any> {
    const url = this.baseUrl + '/api/auth/login'; // Complete login endpoint
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Headers
    this._isAuthenticated.next(true);
    // Prepare request payload
    const body = { email, password };

    // Make the POST request
    return this.http.post(url, body, { headers });
  }

  signUp(user:any):Observable<any>{
    const url = this.baseUrl + '/moneymining/api/add/user';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("user in service class : ", user);
    return this.http.post<any>(url,user,{ headers: headers });
  }
  /*
//* Method to send OTP
sendOtp(email: string): Observable<any> {
    // URL with query parameter for email
    const url = `${this.baseUrl}/moneymining/api/send/otp?email=${encodeURIComponent(email)}`;
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Sending OTP to email: ", email);

    // Send empty body because data is in query parameters
    return this.http.post<any>(url, {}, { headers: headers });
}*/

sendOtp(email: string): Observable<any> {
  const otpType = 'o';

  const url = this.baseUrl +`/moneymining/api/send/otp?email=${email}&otpType=${otpType}`;
  //const url = `${this.baseUrl}/moneymining/api/send/otp?email=${email}`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  console.log("Sending OTP to email: ", email);

  // Send POST request (with empty body)
  return this.http.post<any>(url, {}, { headers: headers });
}

// Method to verify OTP
verifyOtp(email:string, otp: string): Observable<any> {
  const url = this.baseUrl +`/moneymining/api/enabled/user?email=${email}&otp=${otp}`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  console.log("Verifying OTP: ", otp);
  return this.http.post<any>(url, {}, { headers: headers });
}


  // Set the user authentication state (logout)
  logout(): void {
    this._isAuthenticated.next(false); // Change to false when user logs out
  }

  // Check current authentication status
  get isAuthenticated(): boolean {
    return this._isAuthenticated.value;
  }
}
