import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Invoice } from '../interfaces/invoice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/invoices';

  createInvoice(invoiceData: Invoice[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, { products: invoiceData });
  }
}
