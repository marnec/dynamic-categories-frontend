import { FormControl, FormGroup } from '@angular/forms';
import { BaseEntity } from './base-entity.interface';
import { Category } from './category.interface';
import { Metadata, MetadataForm } from './metadata.interface';

export type PropertyTypes =
  (typeof Property.types)[keyof typeof Property.types];

export namespace Property {
  export const types = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    constainedChoice: 'constrainedChoice',
    freeChoice: 'freeChoice',
  } as const;

  export const viewModes = {
    select: 'select',
    color: 'color',
  } as const;
}

export type ViewModes =
  (typeof Property.viewModes)[keyof typeof Property.viewModes];

export interface Property extends BaseEntity {
  name: string;

  type: PropertyTypes;

  category: Category;

  metadata: Metadata;
}

export interface ItemProperty extends Property {
  metadata: Metadata;
}

export type PropertyForm = {
  name: FormControl<string | null>;
  type: FormControl<PropertyTypes | null>;
  metadata: FormGroup<Omit<MetadataForm, 'value' | 'type'>>;
};

export type ItemPropertyForm = {
  name: FormControl<string | null>;
  type: FormControl<PropertyTypes | null>;
  metadata: FormGroup<MetadataForm>;
};
