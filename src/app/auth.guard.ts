import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const storage = typeof window !== 'undefined' ? window.localStorage : null;
  const token = storage?.getItem('jwt');
  const requiredRole = route.data['role'] as string | undefined;
  const userRole = storage?.getItem('role')?.toUpperCase();

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  try {
    const base64Payload = token.split('.')[1];
    const normalizedPayload = base64Payload
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const decodedPayload =
      typeof window !== 'undefined' && typeof window.atob === 'function'
        ? window.atob(normalizedPayload)
        : Buffer.from(normalizedPayload, 'base64').toString('utf8');
    const payload = JSON.parse(decodedPayload);
    const expiry = payload.exp * 1000;

    if (Date.now() >= expiry) {
      storage?.removeItem('jwt');
      storage?.removeItem('role');
      return router.createUrlTree(['/login']);
    }

    if (requiredRole && userRole !== requiredRole.toUpperCase()) {
      return router.createUrlTree(['/recommend-car']);
    }

    return true;
  } catch {
    storage?.removeItem('jwt');
    storage?.removeItem('role');
    return router.createUrlTree(['/login']);
  }
};
