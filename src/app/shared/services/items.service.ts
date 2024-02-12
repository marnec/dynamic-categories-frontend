import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ItemFilterDto,
  ItemPropertyFilterDto,
  PropertyFilterForm,
} from '../../items/item-filter.dto';
import { Item, ItemFilterForm, ItemForm } from '../item.interface';
import { Property } from '../property.interface';
import { isDefined } from '../functions/is-defined';
import { isNotEmpty } from '../functions/is-not-empty';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private readonly http = inject(HttpClient);

  api = `${environment.api}/items`;

  findItems(value: FormGroup<ItemFilterForm>['value']): Observable<Item[]> {
    const { category, properties } = value;

    if (!properties) {
      throw new Error(
        `Properties should be defined, instead properties=${properties}`
      );
    }

    let filterProperties: ItemPropertyFilterDto[] = properties
      .map((p) => ItemsService.buildItemPropertyFilterDto(p))
      .filter(({ value }) => isNotEmpty(value));

    const filters: ItemFilterDto = {
      category: category!.id,
      properties: filterProperties,
    };

    return this.http.put<Item[]>(this.api, filters);
  }

  save(value: FormGroup<ItemForm>['value']) {
    return this.http.post(this.api, value);
  }

  static buildItemPropertyFilterDto(
    propertyFilterForm: FormGroup<PropertyFilterForm>['value']
  ) {
    const { max, min, name, type } = propertyFilterForm;
    let { value } = propertyFilterForm;

    let filterValue: unknown = value as unknown;

    if (type === Property.types.number) {
      if (isDefined(min) || isDefined(max)) {
        filterValue = { min, max };
      }
    }

    return { name: name!, value: filterValue! } satisfies ItemPropertyFilterDto;
  }
}
