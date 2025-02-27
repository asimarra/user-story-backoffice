import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

export enum Action {
  READ = 'READ',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  READ_ADMIN = 'READ_ADMIN',
}

export interface PermissionEntity {
  resource: string;
  actions: Action[];
  route: string;
  role?: Roles;
}

const PermissionByRole: PermissionEntity[] = [
  {
    role: Roles.ADMIN,
    resource: 'Users',
    route: '/users',
    actions: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE],
  },
  {
    role: Roles.ADMIN,
    resource: 'Products',
    route: '/products',
    actions: [Action.CREATE, Action.UPDATE, Action.READ],
  },
  {
    role: Roles.ADMIN,
    resource: 'Invoices',
    route: '/invoices/admin',
    actions: [Action.READ_ADMIN],
  },
  {
    role: Roles.USER,
    resource: 'Invoices',
    route: '/invoices',
    actions: [Action.CREATE, Action.READ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  getMenu(role: string) {
    return PermissionByRole.filter((p) => p.role === role);
  }
}
