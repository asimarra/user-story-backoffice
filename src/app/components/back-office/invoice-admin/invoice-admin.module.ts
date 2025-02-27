import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { InvoiceLookupComponent } from './invoice-lookup/invoice-lookup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: InvoiceLookupComponent,
  },
];

@NgModule({
  declarations: [InvoiceLookupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    TableModule,
    CardModule,
    InputTextModule,
    DropdownModule,
  ],
})
export class InvoiceAdminModule {}
