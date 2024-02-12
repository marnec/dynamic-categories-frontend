import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, first } from 'rxjs';
import { CategoryForm } from '../shared/category.interface';
import { MetadataForm } from '../shared/metadata.interface';
import {
  Property,
  PropertyForm
} from '../shared/property.interface';
import { CategoriesService } from '../shared/services/categories.service';
import { PropertyComponent } from './property/property.component';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    TranslateModule,
    CommonModule,
    PropertyComponent
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  private readonly categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);

  category?: FormGroup<CategoryForm>;
  propertyTypes = Property.types;
  unsub$ = new Subject();

  get properties(): FormArray<FormGroup<PropertyForm>> {
    return this.category!.controls.properties;
  }

  ngOnInit(): void {
    this.category = new FormGroup<CategoryForm>({
      name: new FormControl<string | null>(null, Validators.required),
      properties: new FormArray<FormGroup<PropertyForm>>([], Validators.min(1)),
    });

    this.addProperty();
  }

  addProperty() {
    this.category!.controls.properties.push(
      new FormGroup<PropertyForm>({
        name: new FormControl<string | null>(null, Validators.required),
        type: new FormControl('string'),
        metadata: new FormGroup<Omit<MetadataForm, 'value' | 'type'>>({
          min: new FormControl(null),
          max: new FormControl(null),
          choices: new FormControl(null),
          viewMode: new FormControl(null)
        }),
      })
    );
  }

  removePropertyAt(index: number) {
    this.category!.controls.properties.removeAt(index);
  }

  saveCategory() {
    if (!this.category?.valid) {
      return;
    }

    this.categoriesService
      .save(this.category.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['/browse']);
      });
  }

  ngOnDestroy(): void {
    this.unsub$.next(null);
    this.unsub$.complete();
  }
}
