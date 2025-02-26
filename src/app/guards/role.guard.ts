import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Action, MenuService } from '../services/menu.service';
import { AuthService } from '../services/auth.service';

export const RoleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const menuService = inject(MenuService);
  const authService = inject(AuthService);

  if (!route.data) {
    return redirectToDashboard(router);
  }

  const userRole = authService.getUserRole();
  const { actions: resourceActions = [], resource = '' } = route.data;
  const permissionByRole = menuService.getMenu(userRole);
  const permissionByResource = getPermissionByResource(
    permissionByRole,
    resource
  );

  if (hasRequiredPermissions(permissionByResource, resourceActions)) {
    return true;
  }

  return redirectToDashboard(router);
};

function getPermissionByResource(permissionByRole: any[], resource: string) {
  return permissionByRole.find(
    (i) => i.resource.toUpperCase() === resource.toUpperCase()
  );
}

function hasRequiredPermissions(
  permissionByResource: any,
  resourceActions: Action[]
): boolean {
  return (
    permissionByResource &&
    resourceActions.every((action: Action) =>
      permissionByResource.actions.includes(action)
    )
  );
}

function redirectToDashboard(router: Router): boolean {
  router.navigate(['/dashboard']);
  return false;
}
