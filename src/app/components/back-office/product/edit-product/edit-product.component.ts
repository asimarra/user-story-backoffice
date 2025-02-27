import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product, statusOptionsData } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  statusOptions = statusOptionsData;

  productId: string = '';

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
    description: [
      '',
      [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')],
    ],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(1)]],
    status: ['ACTIVE', [Validators.required]],
  });

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    if (this.productId) {
      this.productService
        .getProductById(this.productId)
        .subscribe((product) => {
          this.productForm.patchValue(product);
        });
    }
  }

  submitProduct() {
    if (this.productForm.invalid) return;
    this.productService
      .updateProduct(this.productId, this.productForm.value as Partial<Product>)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Product Updated',
            detail: 'Product has been updated successfully.',
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
