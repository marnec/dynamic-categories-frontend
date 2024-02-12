import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject, filter, first, takeUntil } from 'rxjs';
import { Category, ItemCategoryForm } from '../shared/category.interface';
import { ItemForm } from '../shared/item.interface';
import { Metadata, MetadataForm } from '../shared/metadata.interface';
import {
  ItemPropertyForm,
  Property,
  PropertyTypes,
} from '../shared/property.interface';
import { CategoriesService } from '../shared/services/categories.service';
import { ItemsService } from '../shared/services/items.service';
import { Router } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ItemPropertyComponent } from './item-property/item-property.component';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    ItemPropertyComponent
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent implements OnInit, OnDestroy {
  private readonly categoriesService = inject(CategoriesService);
  private readonly itemsService = inject(ItemsService);
  private readonly router = inject(Router);

  categories?: Category[];
  category?: FormControl<Category | null>;
  item?: FormGroup<ItemForm>;
  
  unsub$ = new Subject();

  ngOnInit(): void {
    this.categoriesService
      .getAll()
      .pipe(first())
      .subscribe((categories) => {
        this.categories = categories;
      });

    this.item = new FormGroup<ItemForm>({
      name: new FormControl<string | null>(null, Validators.required),
      category: new FormGroup<ItemCategoryForm>({
        name: new FormControl<string | null>(null, Validators.required),
        templateCategory: new FormControl<string | null>(null),
        properties: new FormArray<FormGroup<ItemPropertyForm>>([]),
      }),
    });

    this.category = new FormControl<Category | null>(null, Validators.required);
    
    this.category.valueChanges
      .pipe(filter(Boolean), takeUntil(this.unsub$))
      .subscribe(({ name, properties, id }) => {
        this.item!.controls.category.controls.templateCategory.setValue(id);
        this.item!.controls.category.controls.name.setValue(name);
        this.item!.controls.category.controls.properties.clear();

        properties.forEach((property) =>
          this.item!.controls.category.controls.properties.push(
            this.createPropertyForm(property)
          )
        );
      });
  }

  createPropertyForm(property: Property): FormGroup<ItemPropertyForm> {
    const { name, type } = property;

    return new FormGroup<ItemPropertyForm>({
      name: new FormControl(name),
      type: new FormControl(type),
      metadata: new FormGroup<MetadataForm>({
        type: new FormControl(type),
        value: new FormControl(
          this.getDefaultValue(type),
          this.getValueValidator(type, property.metadata)
        ),
      }),
    });
  }

  saveItem() {
    if (!this.item?.valid) {
      return;
    }

    this.itemsService
      .save(this.item.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['/browse']);
      });
  }

  getValueValidator(type: PropertyTypes, metadata: Metadata) {
    const { min, max } = metadata;

    const validators = [];

    switch (type) {
      case Property.types.boolean:
        return undefined;

      case Property.types.number:
        validators.push(Validators.required);
        if (min !== undefined && min !== null) {
          validators.push(Validators.min(min));
        }
        if (max !== undefined && max !== null) {
          validators.push(Validators.max(max));
        }
        break;

      default:
        validators.push(Validators.required);
        break;
    }
    return validators;
  }

  getDefaultValue(type: PropertyTypes) {
    switch (type) {
      case Property.types.boolean:
        return false;

      default:
        return null;
    }
  }

  ngOnDestroy(): void {
    this.unsub$.next(null);
    this.unsub$.complete();
  }
}
