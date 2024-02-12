import { Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddItemComponent } from './add-item/add-item.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'browse',
  },
  {
    path: 'browse',
    component: ItemsComponent,
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
  },
  {
    path: 'add-item',
    component: AddItemComponent,
  },
];
