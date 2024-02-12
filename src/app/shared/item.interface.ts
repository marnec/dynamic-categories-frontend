import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseEntity } from './base-entity.interface';
import { Category, ItemCategory, ItemCategoryForm } from './category.interface';
import { PropertyFilterForm } from '../items/item-filter.dto';

export interface Item extends BaseEntity {
  name: string;

  category: ItemCategory;
}

export type ItemForm = {
  name: FormControl<string | null>;
  category: FormGroup<ItemCategoryForm>;
};


export type ItemFilterForm = {
  category: FormControl<Category | null>
  properties: FormArray<FormGroup<PropertyFilterForm>>
}