import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if there is a token in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, the user is authenticated
      return true;
    } else {
      // If token does not exist, redirect to Forbidden component
      this.router.navigate(['/forbidden']);
      return false;
    }
  }
}
