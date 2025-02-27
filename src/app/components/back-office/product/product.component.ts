import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  loading = false;

  products$ = new BehaviorSubject<Product[]>([]);
  displayModal = false;
  selectedProduct: Product | null = null;

  ngOnInit() {
    console.log('ProductModule ngOnInit');
    this.productService.getProducts().subscribe((products) => {
      console.log({ products });

      this.loading = false;
      this.products$.next(products || []);
    });
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'OUT_OF_STOCK':
        return 'warning';
      case 'DISCONTINUED':
        return 'danger';
      case 'DELETED':
        return 'secondary';
      default:
        return 'info';
    }
  }

  goToCreateProduct() {
    this.router.navigate(['products/create']);
  }

  goToEditProduct(id: string) {
    this.router.navigate(['products/edit/' + id]);
  }
}
