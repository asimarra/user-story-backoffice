import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { RoleGuard } from 'src/app/guards/role.guard';
import { Action } from 'src/app/services/menu.service';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes = [
  { path: '', component: ProductComponent },
  {
    path: 'create',
    canActivate: [RoleGuard],
    data: { resource: 'Products', actions: [Action.CREATE] },
    component: CreateProductComponent,
  },
  {
    path: 'edit/:id',
    canActivate: [RoleGuard],
    data: { resource: 'Products', actions: [Action.UPDATE] },
    component: EditProductComponent,
  },
];

@NgModule({
  declarations: [
    ProductComponent,
    CreateProductComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TableModule,
    DialogModule,
    TagModule,
    InputNumberModule,
    DropdownModule,
    InputTextModule,
  ],
})
export class ProductModule {}
