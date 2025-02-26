import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private router = inject(Router);
  private menuService = inject(MenuService);

  menuItems: any[] = [];
  role: string | null = localStorage.getItem('role');
  name: string | null = localStorage.getItem('name');

  ngOnInit() {
    if (this.role) {
      this.menuItems = this.menuService.getMenu(this.role).map((permission) => {
        return {
          label: permission.resource,
          link: `${permission.route.toLowerCase()}`,
        };
      });
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
