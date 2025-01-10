import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false); // Default value is false
  public isAuthenticated$: Observable<boolean> = this._isAuthenticated.asObservable();

  constructor() {}

  // Set the user authentication state (login)
  login(): void {
    this._isAuthenticated.next(true); // Change to true when user logs in
  }

  // Set the user authentication state (logout)
  logout(): void {
    this._isAuthenticated.next(false); // Change to false when user logs out
  }
}
