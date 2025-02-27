import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

const routes = [{ path: '', component: UserComponent }];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    TagModule,
  ],
})
export class UserModule {}
