import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';
import { RoleGuard } from '../../guards/role.guard';
import { Action } from '../../services/menu.service';

const routes: Routes = [
  {
    path: '',
    component: BackOfficeLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'invoices',
        canActivate: [RoleGuard],
        data: { resource: 'Invoices', actions: [Action.READ] },
        loadChildren: () =>
          import('./invoice/invoice.module').then((m) => m.InvoiceModule),
      },
      {
        path: 'invoices/admin',
        canActivate: [RoleGuard],
        data: { resource: 'Invoices', actions: [Action.READ_ADMIN] },
        loadChildren: () =>
          import('./invoice-admin/invoice-admin.module').then(
            (m) => m.InvoiceAdminModule
          ),
      },
      {
        path: 'products',
        canActivate: [RoleGuard],
        data: { resource: 'Products', actions: [Action.READ] },
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'users',
        canActivate: [RoleGuard],
        data: { resource: 'Users', actions: [Action.READ] },
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackOfficeRoutingModule {}
