import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { InvoiceService } from 'src/app/services/invoice.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InvoiceDetail } from 'src/app/interfaces/invoice';

@Component({
  selector: 'app-invoice-lookup',
  templateUrl: './invoice-lookup.component.html',
  styleUrls: ['./invoice-lookup.component.css'],
})
export class InvoiceLookupComponent {
  private fb = inject(FormBuilder);
  private invoiceService = inject(InvoiceService);
  private messageService = inject(MessageService);

  invoiceForm: FormGroup;
  invoices$ = new BehaviorSubject<InvoiceDetail[]>([]);
  filteredInvoices$ = new BehaviorSubject<InvoiceDetail[]>([]);
  invoice$ = new BehaviorSubject<InvoiceDetail | null>(null);
  loading = false;

  constructor() {
    this.invoiceForm = this.fb.group({
      selectedInvoice: [''],
    });
  }

  ngOnInit() {
    this.loading = true;
    this.invoice$.next(null);
    this.invoiceService.getAllInvoices().subscribe({
      next: (invoices) => {
        this.loading = false;
        console.log({ invoices });
        const formattedInvoices = invoices.map((invoice: InvoiceDetail) => ({
          ...invoice,
          displayName: `${invoice.user.name} - ${invoice.products
            .map((p) => p.product.name)
            .join(', ')}`,
        }));
        console.log({ formattedInvoices });
        this.invoices$.next(formattedInvoices);
        this.filteredInvoices$.next(formattedInvoices);
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load invoices',
        });
      },
    });
  }

  searchInvoice() {
    const selectedInvoice = this.invoiceForm.value.selectedInvoice;
    if (!selectedInvoice) return;

    this.loading = true;
    this.invoice$.next(null);
    this.invoiceService.getInvoiceById(selectedInvoice.id).subscribe({
      next: (data) => {
        this.loading = false;
        this.invoice$.next(data);
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invoice not found',
        });
      },
    });
  }
}
