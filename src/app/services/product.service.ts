import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, UpdateProductResponse } from '../interfaces/product';
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

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${productId}`);
  }

  updateProduct(
    productId: string,
    productData: Partial<Product>
  ): Observable<UpdateProductResponse> {
    return this.http.patch<UpdateProductResponse>(
      `${this.productUrl}/${productId}`,
      productData
    );
  }
}
