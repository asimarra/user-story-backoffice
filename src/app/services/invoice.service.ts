import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Invoice, InvoiceDetail } from '../interfaces/invoice';
import { Observable } from 'rxjs';
import { environment } from '../config/environments';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);
  private invoiceUrl = `${environment.API_BASE_URL}/invoices`;

  createInvoice(invoiceData: Invoice[]): Observable<InvoiceDetail> {
    return this.http.post<InvoiceDetail>(this.invoiceUrl, {
      products: invoiceData,
    });
  }

  getUserInvoices(userId: string): Observable<InvoiceDetail[]> {
    return this.http.get<InvoiceDetail[]>(`${this.invoiceUrl}/user/${userId}`);
  }

  getInvoiceById(invoiceId: string): Observable<InvoiceDetail> {
    return this.http.get<InvoiceDetail>(`${this.invoiceUrl}/${invoiceId}`);
  }

  getAllInvoices(): Observable<InvoiceDetail[]> {
    return this.http.get<InvoiceDetail[]>(this.invoiceUrl);
  }
}
