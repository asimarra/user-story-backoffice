import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {CardModule} from 'primeng/card';
import {MultiSelectModule} from 'primeng/multiselect';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

import {InvoiceComponent} from './invoice.component';
import {CreateInvoiceComponent} from './create-invoice/create-invoice.component';
import {RoleGuard} from "../../../guards/role.guard";
import {Action} from "../../../services/menu.service";

const routes = [
  {path: '', component: InvoiceComponent},
  {
    path: 'create',
    canActivate: [RoleGuard],
    data: {resource: 'Invoices', actions: [Action.CREATE]}, component: CreateInvoiceComponent
  },
];

@NgModule({
  declarations: [InvoiceComponent, CreateInvoiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    MultiSelectModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    TableModule,
    DialogModule,
  ],
})
export class InvoiceModule {
}
