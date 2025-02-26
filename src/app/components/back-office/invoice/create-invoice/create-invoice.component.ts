import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent implements OnInit {
  private fb = inject(FormBuilder);
  private invoiceService = inject(InvoiceService);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  invoiceForm = this.fb.group({
    products: [[], Validators.required],
  });
  productOptions: any[] = [];
  selectedProducts: any[] = [];
  totalAmount: number = 0;
  loading: boolean = false;

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.productOptions = products.map((p: any) => ({
        label: p.name,
        value: p.id,
        stock: p.stock,
        price: p.price,
        quantity: 1,
      }));
    });
  }

  addProduct(product: any) {
    if (product.stock > 0) {
      if (!this.selectedProducts.some((p) => p.value === product.value)) {
        this.selectedProducts.push({ ...product });
        this.calculateTotal();
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Out of Stock',
        detail: `The product ${product.name} is currently out of stock. Please select a different product.`,
      });
    }
  }

  removeProduct(index: number) {
    this.selectedProducts.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.selectedProducts.reduce((acc, p) => {
      const quantity = Math.min(p.quantity, p.stock);
      return acc + p.price * quantity;
    }, 0);
  }

  submitInvoice() {
    this.loading = true;
    const invoiceData = this.selectedProducts.map((p) => ({
      productId: p.value,
      quantity: p.quantity,
    }));
    this.invoiceService.createInvoice(invoiceData).subscribe(
      (response) => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Invoice Created',
          detail: 'Your invoice has been generated successfully.',
        });
        this.router.navigate(['invoices']);
      },
      () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      }
    );
  }
}
