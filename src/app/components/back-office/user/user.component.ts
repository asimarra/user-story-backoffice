import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  private userService = inject(UserService);

  users$ = new BehaviorSubject<any[]>([]);

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users$.next(users);
      },
      error: () => {
        console.error('Failed to load users');
      },
    });
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'warning';
      default:
        return 'info';
    }
  }
}
