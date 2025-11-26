import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
      this.router.navigate(['/login']);  // Redirect to login
      return false;
    }

    return true; // Allow access
  }
}
