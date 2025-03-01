import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';
import { BackOfficeRoutingModule } from './back-office-routing.module';
import { HeaderComponent } from './header/header.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    DashboardComponent,
    BackOfficeLayoutComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, BackOfficeRoutingModule, ButtonModule, CardModule],
})
export class BackOfficeModule {}
