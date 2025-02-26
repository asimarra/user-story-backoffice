import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { InvoiceDetail } from 'src/app/interfaces/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  private invoiceService = inject(InvoiceService);
  private router = inject(Router);

  invoices$ = new BehaviorSubject<InvoiceDetail[]>([]);
  userId: string | null = localStorage.getItem('id');
  displayModal = false;
  selectedInvoice: any = null;

  ngOnInit() {
    if (this.userId) {
      this.invoiceService.getUserInvoices(this.userId).subscribe((invoices) => {
        this.invoices$.next(invoices || []);
      });
    }
  }

  showInvoiceDetails(invoice: any) {
    this.selectedInvoice = invoice;
    this.displayModal = true;
  }

  goToCreateInvoice() {
    this.router.navigate(['invoices/create']);
  }
}
