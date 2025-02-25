import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { RouterModule } from '@angular/router';

const routes = [{ path: '', component: InvoiceComponent }];

@NgModule({
  declarations: [InvoiceComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class InvoiceModule {}
