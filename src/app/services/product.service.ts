import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { environment } from '../config/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private productUrl = `${environment.API_BASE_URL}/products`;

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  createProduct(productData: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.productUrl, productData);
  }
}
