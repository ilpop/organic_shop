import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route, state: RouterStateSnapshot) {
    return this.authService.user.pipe(
      map((user) => {
        if (user) {
          // User is not logged in, allow access to login page
          return true;
        } else {
          // User is logged in, redirect to protected page
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
          return false;
        }
      })
    );
  }
}

