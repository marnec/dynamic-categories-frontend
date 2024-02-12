import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseEntity } from './base-entity.interface';
import {
  ItemProperty,
  ItemPropertyForm,
  Property,
  PropertyForm
} from './property.interface';

export interface ItemCategory extends Category {
  properties: ItemProperty[];
}

export interface Category extends BaseEntity {
  name: string;

  properties: Property[];
}

export type CategoryForm = {
  name: FormControl<string | null>;
  properties: FormArray<FormGroup<PropertyForm>>;
};

export type ItemCategoryForm = {
  name: FormControl<string | null>;
  templateCategory: FormControl<string | null>;
  properties: FormArray<FormGroup<ItemPropertyForm>>;
};
