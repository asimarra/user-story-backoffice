import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  Product,
  ProductStatus,
  statusOptionsData,
} from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  statusOptions = statusOptionsData;

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
    description: [
      '',
      [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')],
    ],
    price: [null, [Validators.required, Validators.min(1)]],
    stock: [null, [Validators.required, Validators.min(1)]],
    status: ['ACTIVE', [Validators.required]],
  });
  get name() {
    return this.productForm.controls['name'];
  }
  get description() {
    return this.productForm.controls['description'];
  }
  get price() {
    return this.productForm.controls['price'];
  }
  get stock() {
    return this.productForm.controls['stock'];
  }
  get status() {
    return this.productForm.controls['status'];
  }

  submitProduct() {
    if (this.productForm.invalid) return;

    this.productService
      .createProduct(this.productForm.value as Partial<Product>)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Product Created',
            detail: 'Product has been created successfully.',
          });
          this.router.navigate(['products']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong',
          });
        },
      });
  }
}
