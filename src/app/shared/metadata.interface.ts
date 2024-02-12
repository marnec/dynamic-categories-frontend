import { FormControl } from '@angular/forms';
import { PropertyTypes } from './property.interface';

export type Metadata = {
  type: PropertyTypes;
  value: string | number | boolean;
  max?: number;
  min?: number;
  choices?: string[]
  viewMode?: string;
};

export type MetadataForm = {
  type: FormControl<PropertyTypes | null>;
  value: FormControl<string | number | boolean | null>;
  max?: FormControl<number | null>;
  min?: FormControl<number | null>;
  choices?: FormControl<string[] | null>;
  viewMode?: FormControl<string | null>;
};


