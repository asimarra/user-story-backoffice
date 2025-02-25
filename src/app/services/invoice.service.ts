import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Invoice } from '../interfaces/invoice';
import { Observable } from 'rxjs';
import { environment } from '../config/environments';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);
  private invoiceUrl = `${environment.API_BASE_URL}/invoices`;

  createInvoice(invoiceData: Invoice[]): Observable<any> {
    return this.http.post<any>(this.invoiceUrl, { products: invoiceData });
  }
}
