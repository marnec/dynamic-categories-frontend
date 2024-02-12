import { FormControl } from '@angular/forms';

export type ItemPropertyFilterDto = {
  name: string;
  value: unknown;
};

export interface ItemFilterDto {
  category: string;
  properties: ItemPropertyFilterDto[];
}

export type PropertyFilterForm = {
  type: FormControl<string | null>
  name: FormControl<string | null>;
  value: FormControl<unknown>;
  max: FormControl<number | null>;
  min: FormControl<number | null>;
};
