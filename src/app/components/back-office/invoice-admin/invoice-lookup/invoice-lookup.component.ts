import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { InvoiceDetail } from 'src/app/interfaces/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-lookup',
  templateUrl: './invoice-lookup.component.html',
  styleUrls: ['./invoice-lookup.component.css'],
})
export class InvoiceLookupComponent {
  private invoiceService = inject(InvoiceService);
  private messageService = inject(MessageService);
  loading = false;

  invoiceId: string = '';
  invoice$ = new BehaviorSubject<InvoiceDetail | null>(null);

  onInputChange() {
    this.invoice$.next(null);
  }

  searchInvoice() {
    if (!this.invoiceId.trim()) return;

    this.loading = true;
    this.invoiceService.getInvoiceById(this.invoiceId).subscribe(
      (data) => {
        this.loading = false;
        this.invoice$.next(data);
      },
      (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invoice not found',
        });
      }
    );
  }
}
