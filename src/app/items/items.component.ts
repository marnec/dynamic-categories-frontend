import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import {
  BehaviorSubject,
  Subject,
  catchError,
  debounceTime,
  delay,
  filter,
  first,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { Category } from '../shared/category.interface';
import { isDefined } from '../shared/functions/is-defined';
import { Item, ItemFilterForm } from '../shared/item.interface';
import { CategoriesService } from '../shared/services/categories.service';
import { ItemsService } from '../shared/services/items.service';
import { ItemCardComponent } from './item-card/item-card.component';
import { PropertyFilterForm } from './item-filter.dto';
import { ItemPropertyFilterComponent } from './item-property-filter/item-property-filter.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule,
    ReactiveFormsModule,
    ItemCardComponent,
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSliderModule,
    ItemPropertyFilterComponent,
    MatProgressBarModule,
    MatExpansionModule,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
})
export class ItemsComponent implements OnInit, OnDestroy {
  private readonly itemsService = inject(ItemsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  categories?: Category[];
  items$ = new BehaviorSubject<Item[]>([]);
  unsub$ = new Subject();
  loading = false;

  itemFilter = new FormGroup<ItemFilterForm>({
    category: new FormControl<Category | null>(null, Validators.required),
    properties: new FormArray<FormGroup<PropertyFilterForm>>([]),
  });

  ngOnInit(): void {
    this.categoriesService
      .getAll()
      .pipe(first())
      .subscribe((categories) => {
        this.categories = categories;
      });

    this.itemFilter.controls.category.valueChanges
      .pipe(
        filter(Boolean),
        tap(() => this.itemFilter.controls.properties.clear()),
        delay(100),
        takeUntil(this.unsub$)
      )
      .subscribe(({ properties }) => {
        properties.forEach(({ name, type, metadata }) => {
          const { min, max } = metadata;

          this.itemFilter.controls.properties.push(
            new FormGroup<PropertyFilterForm>({
              type: new FormControl(type, Validators.required),
              name: new FormControl(name, Validators.required),
              value: new FormControl(null),
              min: new FormControl(isDefined<number>(min) ? min : null),
              max: new FormControl(isDefined<number>(max) ? max : null),
            })
          );
        });
      });

    this.itemFilter.valueChanges
      .pipe(
        tap(() => (this.loading = true)),
        debounceTime(300),
        switchMap((value) =>
          this.itemsService.findItems(value).pipe(
            catchError(() => {
              this.loading = false;
              return of([]);
            })
          )
        ),
        takeUntil(this.unsub$)
      )
      .subscribe((items) => {
        this.loading = false;
        this.items$.next(items);

        // I don't know why, sometimes view is not updated (angular bug?)
        this.changeDetectorRef.detectChanges();
      });
  }

  resetFilters() {
    for (const property of this.itemFilter.controls.properties.controls) {
      property.patchValue({ value: null, max: null, min: null });
    }
  }

  ngOnDestroy(): void {
    this.unsub$.next(null);
    this.unsub$.complete();
  }
}
