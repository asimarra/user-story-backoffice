import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const RoleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const userRole = localStorage.getItem('role');
  const requiredRoles = route.data['roles'] as string[];

  if (userRole && requiredRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
