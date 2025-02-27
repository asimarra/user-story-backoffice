import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private productService = inject(ProductService);
  private invoiceService = inject(InvoiceService);

  userId: string = localStorage.getItem('id') || '';
  userName: string = localStorage.getItem('name') || 'Guest';
  userRole: string = localStorage.getItem('role') || 'USER';
  totalUsers$ = new BehaviorSubject<number>(0);
  totalProducts$ = new BehaviorSubject<number>(0);
  userPurchases$ = new BehaviorSubject<number>(0);
  totalSpent$ = new BehaviorSubject<number>(0);

  ngOnInit() {
    if (this.userRole === 'ADMIN') {
      this.loadAdminStats();
    } else {
      this.loadUserStats(this.userId);
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  loadAdminStats() {
    this.userService.getUsers().subscribe({
      next: (users) => this.totalUsers$.next(users.length),
      error: () => console.error('Failed to load users'),
    });
    this.productService.getProducts().subscribe({
      next: (products) => this.totalProducts$.next(products.length),
      error: () => console.error('Failed to load products'),
    });
  }

  loadUserStats(userId: string) {
    this.invoiceService.getUserInvoices(userId).subscribe({
      next: (invoices) => {
        this.userPurchases$.next(invoices.length);
        this.totalSpent$.next(
          invoices.reduce((sum, inv) => sum + inv.total, 0)
        );
      },
      error: () => console.error('Failed to load user invoices'),
    });
  }
}
