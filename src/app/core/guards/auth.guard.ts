import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const userRole = authService.getRole();

  const allowedRoles = route.data['roles'] as Array<string>;

  // Check if the user is logged in and if the role matches
  if (isLoggedIn && (!allowedRoles || allowedRoles.includes(userRole))) {
    return true; // Allow access
  } else {
    // Redirect unauthorized users
    router.navigate(['/unauthorized']);
    return false; // Deny access
  }

};
